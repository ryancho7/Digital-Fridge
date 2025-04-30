import express from 'express';
import Fridge from '../models/Fridge.js';
import FoodItem from '../models/FoodItem.js';

const router = express.Router();

// Get user fridges with food items included
router.get('/', async (req, res) => {
  try {
    const fridges = await Fridge.find({ user: req.userId }).lean();

    const fridgesWithItems = await Promise.all(fridges.map(async fridge => {
      const items = await FoodItem.find({ fridge: fridge._id });
      return { ...fridge, items };
    }));

    res.json(fridgesWithItems);
  } catch (error) {
    console.error(`Error fetching fridges:`, error);
    res.status(500).json({ message: 'Error fetching fridges' });
  }
});

export default router;
