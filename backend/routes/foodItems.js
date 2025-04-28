import express from 'express';
import FoodItem from '../models/FoodItem.js';

const router = express.Router();

// get fridge food items
router.get('/:fridgeId', async (req, res) => {

    const { fridgeId } = req.params;

    // fetch food items
    try {
        const foodItems = await FoodItem.find({ fridgeId, user: req.userId });
        res.json(foodItems);
    } catch (error) {
        console.log(`Error fetching food items in fridge ${error}`);
        res.status(500).json({ message: 'Error fetching food items in fridge'});
    }
});

// create new food item
router.post('/:fridgeId', async(req, res) => {

    const { fridgeId } = req.params;
    const { name, category, quantity, unit, expirationDate } = req.body;

    // create new food item
    const newFoodItem = new FoodItem({
        fridge: fridgeId,
        name: name,
        category: category,
        quantity: quantity,
        unit: unit,
        expirationDate: new Date(expirationDate)
    });

    try {
        await newFoodItem.save();
        res.status(201).json({ message: 'Food Item created' });
    } catch  (error) {
        console.log(`Error creating food item: ${error}`);
        res.status(500).json({ message: 'Error creating food item' });
    }
});

export default router;