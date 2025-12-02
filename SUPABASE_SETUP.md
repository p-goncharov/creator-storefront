# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in:
   - **Name**: creator-storefront
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. Wait for project to be provisioned (~2 minutes)

## Step 2: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Paste the SQL below and click **"Run"**:

```sql
-- Create creators table
CREATE TABLE creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  handle TEXT NOT NULL UNIQUE,
  avatar TEXT NOT NULL,
  followers INTEGER NOT NULL DEFAULT 0,
  avg_views INTEGER NOT NULL DEFAULT 0,
  engagement NUMERIC(5,2) NOT NULL DEFAULT 0,
  revenue INTEGER NOT NULL DEFAULT 0,
  socials JSONB DEFAULT '{"instagram": "", "youtube": "", "tiktok": ""}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for development)
-- NOTE: In production, you should restrict these policies!
CREATE POLICY "Enable read access for all users" ON creators
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON creators
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON creators
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete access for all users" ON creators
  FOR DELETE USING (true);

-- Insert sample data
INSERT INTO creators (name, handle, avatar, followers, avg_views, engagement, revenue, socials) VALUES
  ('Emma Johnson', 'emmajohnson', 'https://i.pravatar.cc/150?img=1', 1250000, 450000, 6.8, 85000, '{"instagram": "https://instagram.com/emmajohnson", "youtube": "https://youtube.com/@emmajohnson", "tiktok": "https://tiktok.com/@emmajohnson"}'),
  ('Marcus Chen', 'marcuschen', 'https://i.pravatar.cc/150?img=12', 890000, 320000, 7.2, 62000, '{"instagram": "https://instagram.com/marcuschen", "youtube": "https://youtube.com/@marcuschen", "tiktok": "https://tiktok.com/@marcuschen"}'),
  ('Sofia Rodriguez', 'sofiarodriguez', 'https://i.pravatar.cc/150?img=5', 2100000, 780000, 5.4, 125000, '{"instagram": "https://instagram.com/sofiarodriguez", "youtube": "https://youtube.com/@sofiarodriguez", "tiktok": "https://tiktok.com/@sofiarodriguez"}'),
  ('Alex Thompson', 'alexthompson', 'https://i.pravatar.cc/150?img=8', 560000, 185000, 8.1, 42000, '{"instagram": "https://instagram.com/alexthompson", "youtube": "https://youtube.com/@alexthompson", "tiktok": "https://tiktok.com/@alexthompson"}'),
  ('Priya Patel', 'priyapatel', 'https://i.pravatar.cc/150?img=9', 1450000, 520000, 6.3, 95000, '{"instagram": "https://instagram.com/priyapatel", "youtube": "https://youtube.com/@priyapatel", "tiktok": "https://tiktok.com/@priyapatel"}'),
  ('Jake Williams', 'jakewilliams', 'https://i.pravatar.cc/150?img=13', 3200000, 1200000, 4.9, 180000, '{"instagram": "https://instagram.com/jakewilliams", "youtube": "https://youtube.com/@jakewilliams", "tiktok": "https://tiktok.com/@jakewilliams"}'),
  ('Maya Anderson', 'mayaanderson', 'https://i.pravatar.cc/150?img=20', 720000, 250000, 7.8, 55000, '{"instagram": "https://instagram.com/mayaanderson", "youtube": "https://youtube.com/@mayaanderson", "tiktok": "https://tiktok.com/@mayaanderson"}'),
  ('David Kim', 'davidkim', 'https://i.pravatar.cc/150?img=14', 980000, 380000, 6.1, 72000, '{"instagram": "https://instagram.com/davidkim", "youtube": "https://youtube.com/@davidkim", "tiktok": "https://tiktok.com/@davidkim"}'),
  ('Isabella Martinez', 'isabellamartinez', 'https://i.pravatar.cc/150?img=24', 1680000, 620000, 5.7, 105000, '{"instagram": "https://instagram.com/isabellamartinez", "youtube": "https://youtube.com/@isabellamartinez", "tiktok": "https://tiktok.com/@isabellamartinez"}');
```

## Step 3: Get Your API Keys

1. Go to **Project Settings** (gear icon) → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (the long key under "Project API keys")

## Step 4: Configure Your App

Add these to your `.env` file:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=
```

Also add them to **Vercel Environment Variables**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = your project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
   - `VITE_API_BASE_URL` = (leave empty)

## Step 5: Deploy

Push to GitHub and Vercel will auto-deploy with the new Supabase backend!

## Database Schema

```
creators
├── id (UUID, Primary Key)
├── name (TEXT)
├── handle (TEXT, Unique)
├── avatar (TEXT)
├── followers (INTEGER)
├── avg_views (INTEGER)
├── engagement (NUMERIC)
├── revenue (INTEGER)
├── socials (JSONB)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```
