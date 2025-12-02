import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
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
  const { id } = req.query;

  // GET creator by ID
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Creator not found' });
      }
      return res.status(500).json({ error: error.message });
    }

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

    return res.status(200).json(transformedData);
  }

  // PUT - Update creator
  if (req.method === 'PUT') {
    const { name, handle, avatar, followers, avgViews, engagement, revenue, socials } = req.body;

    const { data, error } = await supabase
      .from('creators')
      .update({
        name,
        handle,
        avatar,
        followers,
        avg_views: avgViews,
        engagement,
        revenue,
        socials,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Creator not found' });
      }
      return res.status(500).json({ error: error.message });
    }

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

    return res.status(200).json(transformedData);
  }

  // DELETE - Delete creator
  if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Creator deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
