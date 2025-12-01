import { creators } from '../backend/src/data/creators.js';

let creatorsData = [...creators];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  // GET all creators
  if (req.method === 'GET' && !id) {
    return res.status(200).json(creatorsData);
  }

  // GET creator by ID
  if (req.method === 'GET' && id) {
    const creator = creatorsData.find(c => c.id === id);
    if (!creator) {
      return res.status(404).json({ error: 'Creator not found' });
    }
    return res.status(200).json(creator);
  }

  // POST - Create new creator
  if (req.method === 'POST') {
    const newCreator = {
      id: String(Date.now()),
      ...req.body
    };
    creatorsData.push(newCreator);
    return res.status(201).json(newCreator);
  }

  // PUT - Update creator
  if (req.method === 'PUT' && id) {
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
  if (req.method === 'DELETE' && id) {
    const index = creatorsData.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Creator not found' });
    }
    const deletedCreator = creatorsData.splice(index, 1)[0];
    return res.status(200).json({ message: 'Creator deleted successfully', creator: deletedCreator });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
