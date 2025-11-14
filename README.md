# 🎓 PeerLearn - Learn Together, Grow Together

A **complete, production-ready** peer-to-peer learning platform designed to help students connect, collaborate, and learn from each other. PeerLearn makes education accessible, affordable, and engaging through community-driven learning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prateek2105-ops/peerlearn)

## ✨ Features

### 🎯 Fully Implemented
- ✅ **Real-time Chat** - 1-on-1 and group messaging with Supabase Realtime
- ✅ **Video Calling** - WebRTC-powered peer-to-peer video sessions
- ✅ **Study Rooms** - Create and join group study sessions
- ✅ **Study Materials** - Upload, download, and share learning resources
- ✅ **User Profiles** - Customizable profiles with subjects and interests
- ✅ **Authentication** - Secure login and registration
- ✅ **Responsive Design** - Works perfectly on all devices

### 🚧 Ready to Extend
- Session booking and scheduling
- Quizzes and challenges
- AI-powered peer matching
- Achievements and rewards
- Advanced notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free)
- Vercel account (free, for deployment)

### Installation (5 minutes)

1. **Clone the repository**
```bash
git clone https://github.com/prateek2105-ops/peerlearn.git
cd peerlearn
npm install
```

2. **Set up Supabase**
   - Create a project at [supabase.com](https://supabase.com)
   - Run `supabase/schema.sql` in SQL Editor
   - Copy your project URL and anon key

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. **Run the app**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📖 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - Get running in 10 minutes
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to production
- **[Features List](FEATURES.md)** - Complete feature documentation
- **[API Documentation](docs/API.md)** - Database schema and API
- **[Demo Credentials](DEMO_CREDENTIALS.md)** - Test accounts
- **[Contributing](CONTRIBUTING.md)** - How to contribute

## 🎯 Key Features Explained

### 💬 Real-time Chat
- Instant messaging between users
- Group chat in study rooms
- Message history and search
- Real-time updates with Supabase

### 📹 Video Calling
- WebRTC peer-to-peer video
- Audio/video controls
- Picture-in-picture mode
- Integrated with study rooms

### 🏫 Study Rooms
- Create rooms for any subject
- Join active study sessions
- Integrated chat and video
- Participant management

### 📚 Study Materials
- Upload and share resources
- Search and filter by subject
- Download tracking
- Rating system

### 👤 User Profiles
- Customizable profiles
- Subjects and interests
- Education information
- Stats and achievements

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Video**: WebRTC (Simple Peer)
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 Project Structure

```
peerlearn/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── study-rooms/       # Study rooms feature
│   ├── messages/          # Real-time chat
│   ├── profile/           # User profiles
│   └── materials/         # Study materials
├── components/            # Reusable components
│   ├── ChatBox.tsx       # Chat component
│   └── VideoCall.tsx     # Video call component
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   └── webrtc.ts         # WebRTC manager
├── supabase/              # Database
│   ├── schema.sql        # Database schema
│   └── seed.sql          # Sample data
└── docs/                  # Documentation
```

## 🗄️ Database Schema

11 tables with complete relationships:
- `profiles` - User information
- `study_rooms` - Group sessions
- `messages` - Chat messages
- `study_materials` - Shared resources
- `sessions` - 1-on-1 bookings
- `reviews` - User ratings
- `quizzes` - Knowledge tests
- `notifications` - User alerts
- `achievements` - Badges and rewards
- And more...

See [API.md](docs/API.md) for complete schema.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🧪 Testing

### Demo Accounts
See [DEMO_CREDENTIALS.md](DEMO_CREDENTIALS.md) for test accounts.

### Test Features
1. Create a study room
2. Start a chat conversation
3. Upload study materials
4. Edit your profile
5. Join a video call

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup
```bash
git clone https://github.com/prateek2105-ops/peerlearn.git
cd peerlearn
npm install
npm run dev
```

## 📈 Roadmap

See [docs/ROADMAP.md](docs/ROADMAP.md) for the complete roadmap.

### Phase 1 (Current) ✅
- User authentication
- Real-time chat
- Video calling
- Study rooms
- Study materials
- User profiles

### Phase 2 (Next)
- Session scheduling
- Quiz system
- AI peer matching
- Notifications
- Achievements

## 🔒 Security

- Row Level Security (RLS) enabled
- Secure authentication with Supabase
- Input validation and sanitization
- XSS and CSRF protection
- Environment variables for secrets

## 📊 Performance

- Fast initial load with Next.js
- Real-time updates with Supabase
- Optimized database queries
- Efficient caching strategies
- Code splitting and lazy loading

## 🎨 Design

- Modern, clean interface
- Responsive on all devices
- Intuitive navigation
- Consistent design system
- Accessible components

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database and Auth by [Supabase](https://supabase.com/)
- Deployed on [Vercel](https://vercel.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

- 📖 [Documentation](docs/)
- 🐛 [Report Issues](https://github.com/prateek2105-ops/peerlearn/issues)
- 💬 [Discussions](https://github.com/prateek2105-ops/peerlearn/discussions)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**PeerLearn** - Making education accessible for everyone through peer-to-peer learning 🎓

Built with ❤️ by the PeerLearn community