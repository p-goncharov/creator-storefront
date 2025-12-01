import { creators } from '../data/creators.js';

let creatorsData = [...creators];

export const getAllCreators = (req, res) => {
  try {
    res.json(creatorsData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch creators' });
  }
};

export const getCreatorById = (req, res) => {
  try {
    const { id } = req.params;
    const creator = creatorsData.find(c => c.id === id);

    if (!creator) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    res.json(creator);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch creator' });
  }
};

export const createCreator = (req, res) => {
  try {
    const newCreator = {
      id: String(Date.now()),
      ...req.body
    };

    creatorsData.push(newCreator);
    res.status(201).json(newCreator);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create creator' });
  }
};

export const updateCreator = (req, res) => {
  try {
    const { id } = req.params;
    const index = creatorsData.findIndex(c => c.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    creatorsData[index] = {
      ...creatorsData[index],
      ...req.body,
      id
    };

    res.json(creatorsData[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update creator' });
  }
};

export const deleteCreator = (req, res) => {
  try {
    const { id } = req.params;
    const index = creatorsData.findIndex(c => c.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    const deletedCreator = creatorsData.splice(index, 1)[0];
    res.json({ message: 'Creator deleted successfully', creator: deletedCreator });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete creator' });
  }
};
