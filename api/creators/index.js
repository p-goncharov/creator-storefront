import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase configuration missing' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // GET all creators
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Transform data to match frontend format
    const transformedData = data.map(creator => ({
      id: creator.id,
      name: creator.name,
      handle: creator.handle,
      avatar: creator.avatar,
      followers: creator.followers,
      avgViews: creator.avg_views,
      engagement: parseFloat(creator.engagement),
      revenue: creator.revenue,
      socials: creator.socials
    }));

    return res.status(200).json(transformedData);
  }

  // POST - Create new creator
  if (req.method === 'POST') {
    const { name, handle, avatar, followers, avgViews, engagement, revenue, socials } = req.body;

    const { data, error } = await supabase
      .from('creators')
      .insert([{
        name,
        handle,
        avatar,
        followers,
        avg_views: avgViews,
        engagement,
        revenue,
        socials
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Transform response
    const transformedData = {
      id: data.id,
      name: data.name,
      handle: data.handle,
      avatar: data.avatar,
      followers: data.followers,
      avgViews: data.avg_views,
      engagement: parseFloat(data.engagement),
      revenue: data.revenue,
      socials: data.socials
    };

    return res.status(201).json(transformedData);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
