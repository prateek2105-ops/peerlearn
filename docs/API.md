# PeerLearn API Documentation

## Overview
PeerLearn uses Supabase for backend services. This document outlines the main database tables and their relationships.

## Database Tables

### profiles
User profile information
```typescript
{
  id: UUID (Primary Key, references auth.users)
  email: TEXT
  full_name: TEXT
  avatar_url: TEXT?
  bio: TEXT?
  institution: TEXT?
  grade_level: TEXT?
  subjects: TEXT[]
  interests: TEXT[]
  is_verified: BOOLEAN
  rating: DECIMAL
  total_reviews: INTEGER
  total_sessions: INTEGER
  points: INTEGER
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

### study_rooms
Group study sessions
```typescript
{
  id: UUID (Primary Key)
  name: TEXT
  description: TEXT?
  subject: TEXT
  creator_id: UUID (Foreign Key -> profiles)
  max_participants: INTEGER
  is_active: BOOLEAN
  scheduled_at: TIMESTAMP?
  created_at: TIMESTAMP
}
```

### messages
Chat messages
```typescript
{
  id: UUID (Primary Key)
  sender_id: UUID (Foreign Key -> profiles)
  receiver_id: UUID? (Foreign Key -> profiles)
  room_id: UUID? (Foreign Key -> study_rooms)
  content: TEXT
  message_type: TEXT (text|image|file)
  file_url: TEXT?
  is_read: BOOLEAN
  created_at: TIMESTAMP
}
```

### study_materials
Shared learning resources
```typescript
{
  id: UUID (Primary Key)
  uploader_id: UUID (Foreign Key -> profiles)
  title: TEXT
  description: TEXT?
  subject: TEXT
  file_url: TEXT
  file_type: TEXT
  file_size: INTEGER?
  downloads: INTEGER
  rating: DECIMAL
  created_at: TIMESTAMP
}
```

### sessions
1-on-1 tutoring sessions
```typescript
{
  id: UUID (Primary Key)
  tutor_id: UUID (Foreign Key -> profiles)
  student_id: UUID (Foreign Key -> profiles)
  subject: TEXT
  session_type: TEXT (video|chat|study_room)
  status: TEXT (scheduled|ongoing|completed|cancelled)
  scheduled_at: TIMESTAMP?
  duration: INTEGER?
  notes: TEXT?
  created_at: TIMESTAMP
}
```

### reviews
User ratings and feedback
```typescript
{
  id: UUID (Primary Key)
  reviewer_id: UUID (Foreign Key -> profiles)
  reviewee_id: UUID (Foreign Key -> profiles)
  session_id: UUID (Foreign Key -> sessions)
  rating: INTEGER (1-5)
  comment: TEXT?
  created_at: TIMESTAMP
}
```

### quizzes
Knowledge tests
```typescript
{
  id: UUID (Primary Key)
  creator_id: UUID (Foreign Key -> profiles)
  title: TEXT
  subject: TEXT
  difficulty: TEXT (easy|medium|hard)
  questions: JSONB
  time_limit: INTEGER?
  created_at: TIMESTAMP
}
```

### notifications
User notifications
```typescript
{
  id: UUID (Primary Key)
  user_id: UUID (Foreign Key -> profiles)
  title: TEXT
  message: TEXT
  type: TEXT (session|message|achievement|reminder)
  is_read: BOOLEAN
  link: TEXT?
  created_at: TIMESTAMP
}
```

## Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Users can view public profiles
- Users can only edit their own profile
- Messages are only visible to sender/receiver or room participants
- Study materials are publicly viewable
- Sessions are only visible to participants

## Real-time Subscriptions

Subscribe to real-time updates:

```typescript
// Subscribe to new messages in a room
supabase
  .channel('room-messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages',
    filter: `room_id=eq.${roomId}`
  }, (payload) => {
    console.log('New message:', payload.new)
  })
  .subscribe()

// Subscribe to notifications
supabase
  .channel('user-notifications')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    console.log('New notification:', payload.new)
  })
  .subscribe()
```

## Common Queries

### Get user profile
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

### Get active study rooms
```typescript
const { data, error } = await supabase
  .from('study_rooms')
  .select('*')
  .eq('is_active', true)
  .order('created_at', { ascending: false })
```

### Send a message
```typescript
const { data, error } = await supabase
  .from('messages')
  .insert({
    sender_id: userId,
    room_id: roomId,
    content: messageText,
    message_type: 'text'
  })
```

### Get study materials by subject
```typescript
const { data, error } = await supabase
  .from('study_materials')
  .select('*')
  .eq('subject', subjectName)
  .order('created_at', { ascending: false })
```

---

For more information, see [Supabase Documentation](https://supabase.com/docs)