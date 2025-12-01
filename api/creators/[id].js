// Note: This is a simplified version for serverless
// Data will reset on each cold start
const creatorsData = [
  {
    id: "1",
    name: "Emma Johnson",
    handle: "emmajohnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    followers: 1250000,
    avgViews: 450000,
    engagement: 6.8,
    revenue: 85000,
    socials: {
      instagram: "https://instagram.com/emmajohnson",
      youtube: "https://youtube.com/@emmajohnson",
      tiktok: "https://tiktok.com/@emmajohnson"
    }
  }
  // Add more if needed...
];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  // GET creator by ID
  if (req.method === 'GET') {
    const creator = creatorsData.find(c => c.id === id);
    if (!creator) {
      return res.status(404).json({ error: 'Creator not found' });
    }
    return res.status(200).json(creator);
  }

  // PUT - Update creator
  if (req.method === 'PUT') {
    const index = creatorsData.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Creator not found' });
    }
    creatorsData[index] = {
      ...creatorsData[index],
      ...req.body,
      id
    };
    return res.status(200).json(creatorsData[index]);
  }

  // DELETE - Delete creator
  if (req.method === 'DELETE') {
    const index = creatorsData.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Creator not found' });
    }
    const deletedCreator = creatorsData.splice(index, 1)[0];
    return res.status(200).json({ message: 'Creator deleted successfully', creator: deletedCreator });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
