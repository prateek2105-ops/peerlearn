import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  institution?: string;
  grade_level?: string;
  subjects?: string[];
  interests?: string[];
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  total_sessions: number;
  points: number;
  created_at: string;
  updated_at: string;
};

export type StudyRoom = {
  id: string;
  name: string;
  description?: string;
  subject: string;
  creator_id: string;
  max_participants: number;
  is_active: boolean;
  scheduled_at?: string;
  created_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id?: string;
  room_id?: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  file_url?: string;
  is_read: boolean;
  created_at: string;
};

export type StudyMaterial = {
  id: string;
  uploader_id: string;
  title: string;
  description?: string;
  subject: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  downloads: number;
  rating: number;
  created_at: string;
};

export type Session = {
  id: string;
  tutor_id: string;
  student_id: string;
  subject: string;
  session_type: 'video' | 'chat' | 'study_room';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  scheduled_at?: string;
  duration?: number;
  notes?: string;
  created_at: string;
};