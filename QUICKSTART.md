# 🚀 PeerLearn Quick Start Guide

Get PeerLearn running in 10 minutes!

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free)
- A Vercel account (free) - for deployment

## Local Development Setup

### 1. Clone and Install (2 minutes)
```bash
git clone https://github.com/prateek2105-ops/peerlearn.git
cd peerlearn
npm install
```

### 2. Set up Supabase (3 minutes)
1. Go to [supabase.com](https://supabase.com) → Create new project
2. Wait for project initialization (~2 min)
3. Go to **SQL Editor** → New Query
4. Copy all content from `supabase/schema.sql` and run it
5. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon` public key

### 3. Configure Environment (1 minute)
```bash
cp .env.example .env
```

Edit `.env`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run the App (1 minute)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## First Steps

### Create Your Account
1. Click **Sign Up**
2. Fill in your details
3. Check your email for verification (if enabled)
4. You're in!

### Try These Features
- ✅ Create a study room
- ✅ Browse existing rooms
- ✅ Update your profile
- ✅ Explore the dashboard

## Deploy to Production (3 minutes)

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prateek2105-ops/peerlearn)

### Option 2: Manual Deploy
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repository
4. Add environment variables (same as `.env`)
5. Deploy!

## Common Issues

### "Invalid API key"
- Double-check your Supabase URL and keys
- Make sure you copied the `anon` key, not the `service_role` key

### "Database error"
- Ensure you ran the entire `schema.sql` file
- Check Supabase logs for specific errors

### "Build failed"
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Try `npm run build` locally first

## Next Steps

1. **Customize**: Edit colors in `tailwind.config.js`
2. **Add Features**: Check `docs/ROADMAP.md` for ideas
3. **Contribute**: See `CONTRIBUTING.md`
4. **Deploy**: Follow `DEPLOYMENT.md` for production setup

## Need Help?

- 📖 Read the [full README](README.md)
- 🚀 Check [deployment guide](DEPLOYMENT.md)
- 🐛 [Open an issue](https://github.com/prateek2105-ops/peerlearn/issues)
- 💬 Join our community (coming soon)

## What's Included?

✅ User authentication & profiles  
✅ Study rooms  
✅ Dashboard  
✅ Responsive design  
✅ Database with RLS  
✅ Ready for deployment  

## What's Next?

🔜 Real-time chat  
🔜 Video calling  
🔜 File uploads  
🔜 Quizzes  
🔜 AI matching  

---

**Happy Learning! 🎓**

Built with ❤️ by the PeerLearn community