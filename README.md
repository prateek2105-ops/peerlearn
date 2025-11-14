# 🎓 PeerLearn - Learn Together, Grow Together

A peer-to-peer learning platform designed to help students connect, collaborate, and learn from each other. PeerLearn makes education accessible, affordable, and engaging through community-driven learning.

## ✨ Features

### 🤝 Core Learning Features
- **Study Rooms**: Create or join group study sessions with peers
- **1-on-1 Sessions**: Book personal tutoring with video/chat support
- **AI Peer Matching**: Smart algorithm connects you with compatible study partners
- **Real-time Messaging**: Chat with peers and mentors

### 📚 Knowledge Sharing
- **Study Materials**: Upload and download notes, lectures, and resources
- **Resource Library**: Organized by subject and topic
- **Collaborative Learning**: Share knowledge and learn together

### 🎯 Engagement & Motivation
- **Quizzes & Challenges**: Test your knowledge
- **Leaderboards**: Compete and track progress
- **Points & Rewards**: Earn recognition for helping others
- **Achievements**: Unlock badges and milestones

### 🔒 Trust & Safety
- **Verified Profiles**: Ensure authentic users
- **Rating System**: Quality assurance through peer reviews
- **Secure Platform**: Data protection and privacy

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Deployment**: Vercel
- **Video**: WebRTC for peer-to-peer calls
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/prateek2105-ops/peerlearn.git
cd peerlearn
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
   - Enable Email authentication in Supabase Auth settings

4. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema

The application uses the following main tables:
- `profiles` - User profiles and information
- `study_rooms` - Group study sessions
- `messages` - Chat messages
- `study_materials` - Shared resources
- `sessions` - 1-on-1 tutoring sessions
- `reviews` - User ratings and feedback
- `quizzes` - Knowledge tests
- `notifications` - User notifications
- `achievements` - User achievements and badges

## 🎨 Key Pages

- `/` - Landing page
- `/auth/login` - User login
- `/auth/signup` - User registration
- `/dashboard` - Main dashboard
- `/study-rooms` - Browse and create study rooms
- `/sessions` - Manage tutoring sessions
- `/materials` - Study materials library
- `/messages` - Chat interface
- `/quizzes` - Quiz challenges
- `/find-peers` - Peer matching

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prateek2105-ops/peerlearn)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database and Auth by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**PeerLearn** - Making education accessible for everyone through peer-to-peer learning 🎓