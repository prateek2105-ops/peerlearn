# 🚀 PeerLearn Launch Guide

## Quick Launch Checklist

Follow these steps to get PeerLearn live in production!

## Step 1: Set Up Supabase (5 minutes)

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Name**: peerlearn
   - **Database Password**: (generate a strong password - save it!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait ~2 minutes for setup

### 1.2 Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open the file `supabase/schema.sql` from the repository
4. Copy ALL the content
5. Paste it into the SQL Editor
6. Click "Run" (bottom right)
7. You should see "Success. No rows returned"

### 1.3 Configure Authentication
1. Go to **Authentication** → **Providers**
2. Find "Email" provider
3. Make sure it's **enabled**
4. For testing, you can disable email confirmation:
   - Go to **Authentication** → **Settings**
   - Under "Email Auth", toggle OFF "Enable email confirmations"
   - (Re-enable this in production!)

### 1.4 Get Your Credentials
1. Go to **Settings** → **API**
2. Copy these values (you'll need them):
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon public** key (starts with: eyJhbGc...)
   - **service_role** key (starts with: eyJhbGc...)

## Step 2: Deploy to Vercel (3 minutes)

### Option A: One-Click Deploy (Easiest)

1. Click this button:
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/prateek2105-ops/peerlearn)

2. Sign in to Vercel with GitHub

3. Configure the project:
   - **Repository Name**: peerlearn (or your choice)
   - Click "Create"

4. Add Environment Variables:
   - Click "Environment Variables"
   - Add these three variables:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL
   Value: [Your Supabase Project URL]
   
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [Your Supabase anon key]
   
   SUPABASE_SERVICE_ROLE_KEY
   Value: [Your Supabase service_role key]
   ```

5. Click "Deploy"

6. Wait 2-3 minutes for deployment

7. Your app is live! 🎉

### Option B: Manual Deploy

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `prateek2105-ops/peerlearn`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: npm run build
   - **Output Directory**: .next
5. Add Environment Variables (same as Option A)
6. Click "Deploy"

## Step 3: Configure Supabase Redirect URLs

After deployment, you need to tell Supabase about your Vercel URL:

1. Get your Vercel URL (looks like: `https://peerlearn-xxx.vercel.app`)
2. Go to Supabase Dashboard
3. Navigate to **Authentication** → **URL Configuration**
4. Add these URLs:
   - **Site URL**: `https://your-vercel-url.vercel.app`
   - **Redirect URLs**: Add these two:
     - `https://your-vercel-url.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback` (for local dev)
5. Click "Save"

## Step 4: Test Your App

### 4.1 Create Your First Account
1. Visit your Vercel URL
2. Click "Get Started" or "Sign Up"
3. Create an account with your email
4. You should be redirected to the dashboard

### 4.2 Test Core Features
- ✅ Create a study room
- ✅ Send a message (open in two browsers)
- ✅ Edit your profile
- ✅ Upload a study material (use a public URL)

### 4.3 Test with Demo Accounts (Optional)
If you want demo accounts, you need to create them:
1. Sign up with these emails:
   - alice@peerlearn.demo
   - bob@peerlearn.demo
2. Use password: demo123456
3. Fill in profile details

## Step 5: Optional Enhancements

### 5.1 Custom Domain
1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Update Supabase redirect URLs with your custom domain

### 5.2 Enable Supabase Storage (for file uploads)
1. Go to Supabase Dashboard → **Storage**
2. Create a new bucket: `study-materials`
3. Set it to **Public**
4. Create another bucket: `avatars`
5. Set it to **Public**

### 5.3 Set Up Email Notifications
1. Go to Supabase Dashboard → **Authentication** → **Settings**
2. Configure SMTP settings (or use Supabase's default)
3. Customize email templates

### 5.4 Add Analytics
1. Vercel Analytics is automatically enabled
2. View in Vercel Dashboard → Analytics

## Troubleshooting

### Issue: "Invalid API key"
- **Solution**: Double-check your environment variables in Vercel
- Make sure you copied the correct keys from Supabase
- Redeploy after updating environment variables

### Issue: "Database error"
- **Solution**: Make sure you ran the entire schema.sql file
- Check Supabase logs: Dashboard → Logs

### Issue: "Authentication failed"
- **Solution**: Check redirect URLs in Supabase
- Make sure email provider is enabled
- Check if email confirmation is disabled for testing

### Issue: "Build failed"
- **Solution**: Check build logs in Vercel
- Make sure all environment variables are set
- Try redeploying

### Issue: "Can't send messages"
- **Solution**: Check Supabase Realtime is enabled
- Go to Database → Replication → Enable for messages table

## Production Checklist

Before going fully live:

- [ ] Enable email confirmation in Supabase
- [ ] Set up custom domain
- [ ] Configure SMTP for emails
- [ ] Set up monitoring (Sentry)
- [ ] Add rate limiting
- [ ] Review RLS policies
- [ ] Set up database backups
- [ ] Add terms of service
- [ ] Add privacy policy
- [ ] Test on multiple devices
- [ ] Test all features thoroughly

## Monitoring & Maintenance

### Check These Regularly
1. **Vercel Dashboard**: Monitor deployments and errors
2. **Supabase Dashboard**: Check database usage and API requests
3. **User Feedback**: Monitor for issues

### Update Dependencies
```bash
npm update
npm audit fix
git commit -am "Update dependencies"
git push
```

Vercel will auto-deploy!

## Getting Help

- 📖 Check [README.md](README.md) for features
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for details
- 🐛 Open an issue on GitHub
- 💬 Check Supabase/Vercel documentation

## Success! 🎉

Your PeerLearn platform is now live at:
**https://your-app.vercel.app**

Share it with students and start learning together!

---

**Next Steps:**
1. Share the URL with friends
2. Create study rooms
3. Invite students to join
4. Start collaborating!

**Need help?** Open an issue on GitHub or check the documentation.

Happy Learning! 🎓