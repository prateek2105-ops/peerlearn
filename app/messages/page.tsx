'use client';

import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export default function Messages() {
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
        <div className="bg-white rounded-xl shadow-md h-[600px] flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-600">Start a conversation with your peers</p>
          </div>
        </div>
      </main>
    </div>
  );
}