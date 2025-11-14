'use client';

import { useEffect, useState } from 'react';
import { supabase, StudyRoom, Profile } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, Video, MessageSquare, UserPlus } from 'lucide-react';
import ChatBox from '@/components/ChatBox';
import VideoCall from '@/components/VideoCall';

export default function StudyRoomPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [room, setRoom] = useState<StudyRoom | null>(null);
  const [participants, setParticipants] = useState<Profile[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoomData();
  }, [params.id]);

  const loadRoomData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setCurrentUser(user);

    // Load room details
    const { data: roomData } = await supabase
      .from('study_rooms')
      .select('*')
      .eq('id', params.id)
      .single();

    if (roomData) {
      setRoom(roomData);
    }

    // Load participants
    const { data: participantsData } = await supabase
      .from('room_participants')
      .select('user_id, profiles(*)')
      .eq('room_id', params.id);

    if (participantsData) {
      const profiles = participantsData.map((p: any) => p.profiles).filter(Boolean);
      setParticipants(profiles);
      setIsParticipant(participantsData.some((p: any) => p.user_id === user.id));
    }

    setLoading(false);
  };

  const joinRoom = async () => {
    if (!currentUser) return;

    const { error } = await supabase.from('room_participants').insert({
      room_id: params.id,
      user_id: currentUser.id,
    });

    if (!error) {
      setIsParticipant(true);
      loadRoomData();
    }
  };

  const leaveRoom = async () => {
    if (!currentUser) return;

    const { error } = await supabase
      .from('room_participants')
      .delete()
      .eq('room_id', params.id)
      .eq('user_id', currentUser.id);

    if (!error) {
      router.push('/study-rooms');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading room...</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Room not found</h2>
          <Link href="/study-rooms" className="text-primary-600 hover:text-primary-700">
            Back to Study Rooms
          </Link>
        </div>
      </div>
    );
  }

  if (showVideo) {
    return (
      <VideoCall
        roomId={params.id}
        userId={currentUser.id}
        onEndCall={() => setShowVideo(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/study-rooms" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{room.name}</h1>
                <p className="text-sm text-gray-600">{room.subject}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isParticipant ? (
                <>
                  <button
                    onClick={() => setShowVideo(true)}
                    className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    <Video className="h-5 w-5" />
                    <span>Start Video</span>
                  </button>
                  <button
                    onClick={leaveRoom}
                    className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
                  >
                    Leave Room
                  </button>
                </>
              ) : (
                <button
                  onClick={joinRoom}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Join Room</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About this room</h2>
              <p className="text-gray-600">{room.description || 'No description provided.'}</p>
            </div>

            {isParticipant ? (
              <div className="h-[600px]">
                <ChatBox roomId={params.id} currentUserId={currentUser.id} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Join to chat</h3>
                <p className="text-gray-600 mb-6">
                  Join this study room to participate in the conversation
                </p>
                <button
                  onClick={joinRoom}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
                >
                  Join Room
                </button>
              </div>
            )}
          </div>

          {/* Participants Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Participants</h2>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>{participants.length}/{room.max_participants}</span>
                </div>
              </div>

              <div className="space-y-3">
                {participants.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No participants yet
                  </p>
                ) : (
                  participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {participant.full_name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {participant.full_name}
                        </p>
                        <p className="text-xs text-gray-500">{participant.institution}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}