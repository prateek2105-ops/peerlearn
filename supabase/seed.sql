-- Seed data for PeerLearn demo
-- Run this after creating auth users through Supabase Dashboard

-- Sample study materials
INSERT INTO study_materials (uploader_id, title, description, subject, file_url, file_type, downloads, rating) VALUES
  -- Replace 'user-id' with actual user IDs
  ('00000000-0000-0000-0000-000000000000', 'Introduction to Calculus', 'Comprehensive notes covering limits, derivatives, and integrals', 'Mathematics', 'https://example.com/calculus.pdf', 'pdf', 45, 4.5),
  ('00000000-0000-0000-0000-000000000000', 'Quantum Physics Basics', 'Fundamental concepts of quantum mechanics', 'Physics', 'https://example.com/quantum.pdf', 'pdf', 32, 4.7),
  ('00000000-0000-0000-0000-000000000000', 'Organic Chemistry Guide', 'Complete guide to organic chemistry reactions', 'Chemistry', 'https://example.com/organic.pdf', 'pdf', 28, 4.3),
  ('00000000-0000-0000-0000-000000000000', 'Data Structures & Algorithms', 'Essential DSA concepts with examples', 'Computer Science', 'https://example.com/dsa.pdf', 'pdf', 67, 4.8),
  ('00000000-0000-0000-0000-000000000000', 'Cell Biology Notes', 'Detailed notes on cell structure and function', 'Biology', 'https://example.com/cell-bio.pdf', 'pdf', 23, 4.4),
  ('00000000-0000-0000-0000-000000000000', 'Shakespeare Analysis', 'Literary analysis of major Shakespeare works', 'Literature', 'https://example.com/shakespeare.pdf', 'pdf', 19, 4.6);

-- Sample study rooms
INSERT INTO study_rooms (name, description, subject, creator_id, max_participants, is_active) VALUES
  ('Calculus Study Group', 'Working through calculus problems together', 'Mathematics', '00000000-0000-0000-0000-000000000000', 10, true),
  ('Physics Problem Solving', 'Solving physics problems and discussing concepts', 'Physics', '00000000-0000-0000-0000-000000000000', 8, true),
  ('CS Interview Prep', 'Preparing for technical interviews', 'Computer Science', '00000000-0000-0000-0000-000000000000', 15, true),
  ('Biology Lab Discussion', 'Discussing lab experiments and results', 'Biology', '00000000-0000-0000-0000-000000000000', 12, true),
  ('Literature Book Club', 'Reading and analyzing classic literature', 'Literature', '00000000-0000-0000-0000-000000000000', 20, true);

-- Sample quizzes
INSERT INTO quizzes (creator_id, title, subject, difficulty, questions, time_limit) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Calculus Basics Quiz', 'Mathematics', 'easy', 
   '[
     {"question": "What is the derivative of x^2?", "options": ["2x", "x", "2", "x^2"], "correct": 0},
     {"question": "What is the integral of 1/x?", "options": ["x", "ln(x)", "1/x^2", "e^x"], "correct": 1}
   ]'::jsonb, 15),
  ('00000000-0000-0000-0000-000000000000', 'Physics Fundamentals', 'Physics', 'medium',
   '[
     {"question": "What is Newton''s Second Law?", "options": ["F=ma", "E=mc^2", "F=G(m1m2)/r^2", "v=u+at"], "correct": 0},
     {"question": "What is the speed of light?", "options": ["3x10^8 m/s", "3x10^6 m/s", "3x10^10 m/s", "3x10^5 m/s"], "correct": 0}
   ]'::jsonb, 20);

-- Sample notifications (these will be created dynamically in the app)
-- Just showing the structure
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Welcome to PeerLearn!', 'Start by joining a study room or creating your own', 'reminder', false),
  ('00000000-0000-0000-0000-000000000000', 'New Study Room Available', 'Check out the new Calculus Study Group', 'session', false);

-- Sample achievements
INSERT INTO achievements (user_id, title, description, badge_icon, points) VALUES
  ('00000000-0000-0000-0000-000000000000', 'First Session', 'Completed your first study session', '🎓', 10),
  ('00000000-0000-0000-0000-000000000000', 'Helpful Peer', 'Helped 5 students with their questions', '🤝', 25),
  ('00000000-0000-0000-0000-000000000000', 'Knowledge Sharer', 'Uploaded 3 study materials', '📚', 15);

-- Note: Replace all '00000000-0000-0000-0000-000000000000' with actual user IDs
-- You can get user IDs from auth.users table after creating demo accounts