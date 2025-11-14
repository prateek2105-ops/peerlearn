'use client';

import { useEffect, useState } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Users, Video, Upload, Award, MessageSquare, LogOut, Bell, User } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">PeerLearn</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-primary-600">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/profile" className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2">
                <div className="h-10 w-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {profile?.full_name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700">{profile?.full_name}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-600 hover:text-red-600"
                title="Sign Out"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name}!</h1>
          <p className="text-primary-100">Ready to learn something new today?</p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <StatBox label="Points" value={profile?.points || 0} />
            <StatBox label="Sessions" value={profile?.total_sessions || 0} />
            <StatBox label="Rating" value={profile?.rating?.toFixed(1) || '0.0'} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ActionCard
            icon={<Users className="h-8 w-8" />}
            title="Study Rooms"
            description="Join or create study rooms"
            href="/study-rooms"
            color="bg-blue-500"
          />
          <ActionCard
            icon={<Video className="h-8 w-8" />}
            title="1-on-1 Sessions"
            description="Book personal tutoring"
            href="/sessions"
            color="bg-purple-500"
          />
          <ActionCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="Messages"
            description="Chat with peers"
            href="/messages"
            color="bg-green-500"
          />
          <ActionCard
            icon={<Upload className="h-8 w-8" />}
            title="Study Materials"
            description="Browse and share notes"
            href="/materials"
            color="bg-orange-500"
          />
          <ActionCard
            icon={<Award className="h-8 w-8" />}
            title="Quizzes"
            description="Test your knowledge"
            href="/quizzes"
            color="bg-red-500"
          />
          <ActionCard
            icon={<User className="h-8 w-8" />}
            title="My Profile"
            description="View and edit your profile"
            href="/profile"
            color="bg-indigo-500"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <ActivityItem
              title="No recent activity"
              description="Start by joining a study room or booking a session"
              time=""
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-primary-100">{label}</div>
    </div>
  );
}

function ActionCard({ icon, title, description, href, color }: any) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}

function ActivityItem({ title, description, time }: any) {
  return (
    <div className="flex items-start space-x-3 py-3 border-b last:border-b-0">
      <div className="flex-1">
        <p className="text-gray-900 font-medium">{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      {time && <span className="text-gray-500 text-sm">{time}</span>}
    </div>
  );
}