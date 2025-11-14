'use client';

import { useEffect, useState } from 'react';
import { supabase, Profile } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Mail, School, BookOpen, Award, Edit2, Save } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    institution: '',
    grade_level: '',
    subjects: [] as string[],
    interests: [] as string[],
  });

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
      setFormData({
        full_name: data.full_name || '',
        bio: data.bio || '',
        institution: data.institution || '',
        grade_level: data.grade_level || '',
        subjects: data.subjects || [],
        interests: data.interests || [],
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        bio: formData.bio,
        institution: formData.institution,
        grade_level: formData.grade_level,
        subjects: formData.subjects,
        interests: formData.interests,
        updated_at: new Date().toISOString(),
      })
      .eq('id', profile.id);

    if (!error) {
      setEditing(false);
      loadProfile();
    }
    setSaving(false);
  };

  const addSubject = (subject: string) => {
    if (subject && !formData.subjects.includes(subject)) {
      setFormData({ ...formData, subjects: [...formData.subjects, subject] });
    }
  };

  const removeSubject = (subject: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((s) => s !== subject),
    });
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData({ ...formData, interests: [...formData.interests, interest] });
    }
  };

  const removeInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <User className="h-8 w-8 text-primary-600" />
                <span className="text-2xl font-bold text-gray-900">Profile</span>
              </div>
            </div>
            {editing ? (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
              >
                <Edit2 className="h-5 w-5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-start space-x-6">
            <div className="h-24 w-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {profile?.full_name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              {editing ? (
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="text-3xl font-bold text-gray-900 mb-2 w-full border-b-2 border-primary-600 focus:outline-none"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile?.full_name}</h1>
              )}
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{profile?.email}</span>
                </div>
                {profile?.is_verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Verified
                  </span>
                )}
              </div>
              {editing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600">{profile?.bio || 'No bio yet'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <StatCard icon={<Award />} label="Points" value={profile?.points || 0} />
          <StatCard icon={<BookOpen />} label="Sessions" value={profile?.total_sessions || 0} />
          <StatCard
            icon={<Award />}
            label="Rating"
            value={`${profile?.rating?.toFixed(1) || '0.0'} ⭐`}
          />
        </div>

        {/* Education Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <School className="h-6 w-6 text-primary-600" />
            <span>Education</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Your school/college"
                />
              ) : (
                <p className="text-gray-900">{profile?.institution || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade/Year
              </label>
              {editing ? (
                <input
                  type="text"
                  value={formData.grade_level}
                  onChange={(e) => setFormData({ ...formData, grade_level: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 10th Grade, 2nd Year"
                />
              ) : (
                <p className="text-gray-900">{profile?.grade_level || 'Not specified'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subjects</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.subjects.map((subject) => (
              <span
                key={subject}
                className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
              >
                <span>{subject}</span>
                {editing && (
                  <button
                    onClick={() => removeSubject(subject)}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
          {editing && (
            <input
              type="text"
              placeholder="Add a subject and press Enter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addSubject((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          )}
        </div>

        {/* Interests */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.interests.map((interest) => (
              <span
                key={interest}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
              >
                <span>{interest}</span>
                {editing && (
                  <button
                    onClick={() => removeInterest(interest)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
          {editing && (
            <input
              type="text"
              placeholder="Add an interest and press Enter"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addInterest((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="text-primary-600">{icon}</div>
        <span className="text-gray-600 text-sm">{label}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  );
}