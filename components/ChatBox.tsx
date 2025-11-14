'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase, Message } from '@/lib/supabase';
import { Send, Paperclip } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ChatBoxProps {
  roomId?: string;
  receiverId?: string;
  currentUserId: string;
}

export default function ChatBox({ roomId, receiverId, currentUserId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
    subscribeToMessages();
  }, [roomId, receiverId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    let query = supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (roomId) {
      query = query.eq('room_id', roomId);
    } else if (receiverId) {
      query = query.or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .or(`sender_id.eq.${receiverId},receiver_id.eq.${receiverId}`);
    }

    const { data, error } = await query;
    if (data) {
      setMessages(data);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: roomId ? `room_id=eq.${roomId}` : undefined,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    const messageData: any = {
      sender_id: currentUserId,
      content: newMessage,
      message_type: 'text',
    };

    if (roomId) {
      messageData.room_id = roomId;
    } else if (receiverId) {
      messageData.receiver_id = receiverId;
    }

    const { error } = await supabase.from('messages').insert(messageData);

    if (!error) {
      setNewMessage('');
    }
    setLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender_id === currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="border-t p-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-primary-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="break-words">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isOwn ? 'text-primary-100' : 'text-gray-500'
          }`}
        >
          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}