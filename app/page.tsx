'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { BookOpen, Users, Video, Award, MessageSquare, Upload } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">PeerLearn</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-primary-600">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700 hover:text-primary-600">
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Learn Together, Grow Together
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with peers and seniors for collaborative learning, study sessions, and knowledge sharing
          </p>
          {!user && (
            <Link
              href="/auth/signup"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700"
            >
              Get Started Free
            </Link>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Users className="h-12 w-12 text-primary-600" />}
            title="Study Rooms"
            description="Join group study sessions with peers learning the same subjects"
          />
          <FeatureCard
            icon={<Video className="h-12 w-12 text-primary-600" />}
            title="1-on-1 Sessions"
            description="Get personalized guidance through video or chat sessions"
          />
          <FeatureCard
            icon={<MessageSquare className="h-12 w-12 text-primary-600" />}
            title="Peer Matching"
            description="AI-powered matching connects you with the right study partners"
          />
          <FeatureCard
            icon={<Upload className="h-12 w-12 text-primary-600" />}
            title="Share Materials"
            description="Upload and download notes, lectures, and study resources"
          />
          <FeatureCard
            icon={<Award className="h-12 w-12 text-primary-600" />}
            title="Earn Rewards"
            description="Get points and recognition for helping others learn"
          />
          <FeatureCard
            icon={<BookOpen className="h-12 w-12 text-primary-600" />}
            title="Quizzes & Challenges"
            description="Test your knowledge and compete on leaderboards"
          />
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-3 gap-8 text-center">
          <StatCard number="10,000+" label="Active Students" />
          <StatCard number="50,000+" label="Study Sessions" />
          <StatCard number="100+" label="Subjects Covered" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 PeerLearn. Making education accessible for everyone.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-primary-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}