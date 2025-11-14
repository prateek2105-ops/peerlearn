# 🔐 Demo Credentials for PeerLearn

## Test Accounts

Use these demo accounts to test the platform without creating new accounts.

### Student Account 1
```
Email: alice@peerlearn.demo
Password: demo123456
Name: Alice Johnson
Institution: MIT
Grade: 3rd Year
Subjects: Computer Science, Mathematics, Physics
```

### Student Account 2
```
Email: bob@peerlearn.demo
Password: demo123456
Name: Bob Smith
Institution: Stanford University
Grade: 2nd Year
Subjects: Biology, Chemistry, Mathematics
```

### Student Account 3
```
Email: carol@peerlearn.demo
Password: demo123456
Name: Carol Williams
Institution: Harvard University
Grade: 4th Year
Subjects: Literature, History, Philosophy
```

### Tutor Account
```
Email: tutor@peerlearn.demo
Password: demo123456
Name: David Martinez
Institution: Oxford University
Grade: Graduate Student
Subjects: Mathematics, Physics, Computer Science
```

## Creating Demo Accounts

To set up these demo accounts in your Supabase database, run this SQL:

```sql
-- Note: You'll need to create these users through Supabase Auth first
-- Then insert their profiles with these details

-- After creating auth users, insert profiles:
INSERT INTO profiles (id, email, full_name, institution, grade_level, subjects, interests, points, rating, total_sessions, is_verified)
VALUES
  -- Replace 'user-id-1' with actual user IDs from auth.users
  ('user-id-1', 'alice@peerlearn.demo', 'Alice Johnson', 'MIT', '3rd Year', 
   ARRAY['Computer Science', 'Mathematics', 'Physics'], 
   ARRAY['AI', 'Machine Learning', 'Web Development'], 
   150, 4.5, 12, true),
   
  ('user-id-2', 'bob@peerlearn.demo', 'Bob Smith', 'Stanford University', '2nd Year',
   ARRAY['Biology', 'Chemistry', 'Mathematics'],
   ARRAY['Research', 'Lab Work', 'Data Analysis'],
   85, 4.2, 8, true),
   
  ('user-id-3', 'carol@peerlearn.demo', 'Carol Williams', 'Harvard University', '4th Year',
   ARRAY['Literature', 'History', 'Philosophy'],
   ARRAY['Writing', 'Reading', 'Debate'],
   200, 4.8, 20, true),
   
  ('user-id-4', 'tutor@peerlearn.demo', 'David Martinez', 'Oxford University', 'Graduate Student',
   ARRAY['Mathematics', 'Physics', 'Computer Science'],
   ARRAY['Teaching', 'Research', 'Mentoring'],
   350, 4.9, 45, true);
```

## Quick Setup Script

For development, you can use Supabase's Auth Admin API to create these users programmatically:

```javascript
// Run this in your Supabase SQL Editor or via API
const demoUsers = [
  {
    email: 'alice@peerlearn.demo',
    password: 'demo123456',
    user_metadata: {
      full_name: 'Alice Johnson',
      institution: 'MIT',
      grade_level: '3rd Year'
    }
  },
  // ... add other users
];

// Create users via Supabase Admin API
// Then the profiles will be auto-created via trigger or manual insert
```

## Testing Features

### Test Real-time Chat
1. Open two browser windows (or use incognito mode)
2. Login as Alice in one window
3. Login as Bob in another window
4. Go to Messages and start chatting

### Test Study Rooms
1. Login as Alice
2. Create a study room for "Computer Science"
3. Login as Bob in another window
4. Join Alice's study room
5. Test the chat and video features

### Test Video Calling
1. Join a study room with two different accounts
2. Click "Start Video" in one account
3. The video call interface will appear
4. Test mute/unmute audio and video

### Test Profile Editing
1. Login with any account
2. Go to Profile page
3. Click "Edit Profile"
4. Update bio, subjects, and interests
5. Save changes

## Important Notes

⚠️ **Security**: These are demo credentials for testing only. Never use these in production!

⚠️ **Database**: Make sure to run the schema.sql file before creating demo accounts.

⚠️ **Email Verification**: You may need to disable email verification in Supabase Auth settings for demo accounts to work immediately.

## Disabling Email Verification (Development Only)

1. Go to Supabase Dashboard
2. Navigate to Authentication → Settings
3. Under "Email Auth", toggle off "Enable email confirmations"
4. This allows demo accounts to login immediately without email verification

## Production Setup

For production:
- Remove or disable these demo accounts
- Enable email verification
- Implement proper user registration flow
- Add rate limiting and security measures

---

**Happy Testing! 🎓**