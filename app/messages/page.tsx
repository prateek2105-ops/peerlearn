'use client';

import { useEffect, useState } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Search } from 'lucide-react';
import ChatBox from '@/components/ChatBox';

export default function Messages() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [contacts, setContacts] = useState<Profile[]>([]);
  const [selectedContact, setSelectedContact] = useState<Profile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setCurrentUser(user);

    // Load all users as potential contacts
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', user.id)
      .limit(50);

    if (profiles) {
      setContacts(profiles);
    }
    setLoading(false);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">Messages</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Contacts List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search contacts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredContacts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No contacts found
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors border-b ${
                      selectedContact?.id === contact.id ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {contact.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{contact.full_name}</p>
                      <p className="text-sm text-gray-500 truncate">{contact.institution}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="h-full flex flex-col">
                <div className="bg-white rounded-t-lg shadow-md p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedContact.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedContact.full_name}</p>
                      <p className="text-sm text-gray-500">{selectedContact.institution}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <ChatBox
                    receiverId={selectedContact.id}
                    currentUserId={currentUser.id}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a contact
                  </h3>
                  <p className="text-gray-600">
                    Choose a contact from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}