# 🚀 PeerLearn Deployment Guide

## Quick Deploy to Vercel

### Step 1: Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (takes ~2 minutes)
3. Go to **SQL Editor** in your Supabase dashboard
4. Copy the entire content from `supabase/schema.sql`
5. Paste it into the SQL Editor and click **Run**
6. Go to **Authentication** → **Providers** → Enable **Email** provider
7. Go to **Settings** → **API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

### Step 2: Deploy to Vercel

1. Push this code to your GitHub repository (if not already done)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New** → **Project**
4. Import your `peerlearn` repository
5. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Step 4: Deploy

1. Click **Deploy**
2. Wait for the build to complete (~2-3 minutes)
3. Your app will be live at `your-project.vercel.app`

## Post-Deployment Configuration

### Configure Supabase Auth Redirect URLs

1. Go to your Supabase project
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel deployment URL to:
   - **Site URL**: `https://your-project.vercel.app`
   - **Redirect URLs**: 
     - `https://your-project.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback` (for local development)

### Enable Storage (Optional)

For file uploads (study materials, avatars):

1. Go to **Storage** in Supabase
2. Create a new bucket called `study-materials`
3. Set it to **Public** if you want materials to be publicly accessible
4. Create another bucket called `avatars` for profile pictures

### Set up Storage Policies

Run this SQL in Supabase SQL Editor:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'study-materials');

-- Allow everyone to view files
CREATE POLICY "Anyone can view files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'study-materials');

-- Allow users to upload avatars
CREATE POLICY "Users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Allow everyone to view avatars
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Update Supabase redirect URLs with your custom domain

## Monitoring & Analytics

### Vercel Analytics
- Automatically enabled for all deployments
- View in Vercel dashboard under **Analytics**

### Supabase Monitoring
- Check database usage in **Database** → **Usage**
- Monitor API requests in **API** → **Logs**
- View auth activity in **Authentication** → **Users**

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Review build logs in Vercel dashboard

### Authentication Issues
- Verify Supabase URL and keys are correct
- Check redirect URLs are configured in Supabase
- Ensure email provider is enabled

### Database Connection Issues
- Verify Supabase project is active
- Check RLS policies are set up correctly
- Review Supabase logs for errors

## Scaling Considerations

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited requests
- **Supabase**: 500MB database, 1GB file storage, 50,000 monthly active users

### Upgrade Path
When you need more:
1. Upgrade Vercel to Pro ($20/month) for more bandwidth
2. Upgrade Supabase to Pro ($25/month) for 8GB database and 100GB storage
3. Consider CDN for static assets
4. Implement caching strategies

## Security Checklist

- ✅ Environment variables are set in Vercel (not in code)
- ✅ Supabase RLS policies are enabled
- ✅ Auth redirect URLs are configured
- ✅ HTTPS is enabled (automatic with Vercel)
- ✅ API keys are kept secret
- ✅ Regular security updates via `npm audit`

## Support

For issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Supabase Documentation](https://supabase.com/docs)
3. Open an issue on GitHub
4. Join our community Discord (coming soon)

---

**Congratulations! Your PeerLearn platform is now live! 🎉**