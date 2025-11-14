'use client';

import Link from 'next/link';
import { ArrowLeft, Upload, Download, BookOpen } from 'lucide-react';

export default function Materials() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">Study Materials</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Materials Library</h3>
          <p className="text-gray-600 mb-6">Upload and download notes, lectures, and study resources</p>
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700">
            Upload Material
          </button>
        </div>
      </main>
    </div>
  );
}