import express from 'express';
import FoodItem from '../models/FoodItem.js';
import Fridge from '../models/Fridge.js';

const router = express.Router();

// Get all food items from the user's fridge
router.get('/', async (req, res) => {
	try {
		const fridge = await Fridge.findOne({ user: req.userId });
		if (!fridge) return res.status(404).json({ message: 'Fridge not found' });

		const foodItems = await FoodItem.find({ fridge: fridge._id });
		res.json(foodItems);
	} catch (error) {
		console.error('Error fetching food items:', error);
		res.status(500).json({ message: 'Error fetching food items' });
	}
});

// Create new food item in user's fridge
router.post('/', async (req, res) => {
	const { name, category, quantity, expirationDate } = req.body;

	try {
		const fridge = await Fridge.findOne({ user: req.userId });
		if (!fridge) return res.status(404).json({ message: 'Fridge not found' });

		const newFoodItem = new FoodItem({
			fridge: fridge._id,
			name,
			category,
			quantity,
			expirationDate: new Date(expirationDate),
		});

		await newFoodItem.save();
		res.status(201).json(newFoodItem);
	} catch (error) {
		console.error('Error creating food item:', error);
		res.status(500).json({ message: 'Error creating food item' });
	}
});

// DELETE a food item by ID
router.delete('/:id', async (req, res) => {
	try {
		const foodItemId = req.params.id; // Confirm item exists and belongs to this user's fridge

		const fridge = await Fridge.findOne({ user: req.userId });
		if (!fridge) return res.status(404).json({ message: 'Fridge not found' });

		const item = await FoodItem.findOne({
			_id: foodItemId,
			fridge: fridge._id,
		});
		if (!item)
			return res.status(404).json({ message: 'Food item not found' });

		await FoodItem.findByIdAndDelete(foodItemId);
		res.status(200).json({ message: 'Food item deleted' });
	} catch (error) {
		console.error('Error deleting food item:', error);
		res.status(500).json({ message: 'Error deleting food item' });
	}
});

export default router;
