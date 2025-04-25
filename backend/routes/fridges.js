import express from 'express';
import Fridge from '../models/Fridge.js';

const router = express.Router();

// get user fridges
router.get('/', async (req, res) => {
    try {
        const fridges = await Fridge.find({ user: req.userId });
        res.json(fridges);
    } catch (error) {
        console.log(`Error fetching fridges ${error}`);
        res.status(500).json({ message: 'Error fetching fridges'});
    }
});

// create new fridge
router.post('/', async(req, res) => {
    // create new fridge
    const newFridge = new Fridge({
        user: req.userId,
        name: req.body.name || 'My Digital Fridge',
        createdAt: new Date()
    });
    // save fridge
    try {
        await newFridge.save();
        res.status(201).json({ message: 'Fridge created' });
    } catch (error) {
        console.log(`Error creating fridge: ${error}`);
        res.status(500).json({ message: 'Error creating fridge' });
    }
});

export default router;