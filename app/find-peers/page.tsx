'use client';

import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';

export default function FindPeers() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">Find Study Partners</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Peer Matching</h3>
          <p className="text-gray-600 mb-6">Find study partners based on your subjects and interests</p>
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
            Find Matches
          </button>
        </div>
      </main>
    </div>
  );
}