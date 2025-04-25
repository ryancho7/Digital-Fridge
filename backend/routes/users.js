import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('responding with a resource for users route');
})

// register account
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // check if user already has an account
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new req.models.User({
        username: username,
        email: email,
        passwordHash: hashedPassword
    });

    try {
        await newUser.save();
    } catch (error) {
        console.log(`Error saving user: ${error}`);
        res.status(500).json({ message: 'Error creating saving user' });
    }
    res.status(201).json({ message: 'User created' });
});

// login to account
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // find user in db
    const existingUser = await User.findOne({ email: email });
    if(!existingUser) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // verify password
    const passwordCheck = await bcrypt.compare(password, existingUser.passwordHash);
    if(!passwordCheck) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // create token
    const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d'},
    );
    res.json({ token });
});

export default router;