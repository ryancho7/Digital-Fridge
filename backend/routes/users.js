import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Fridge from '../models/Fridge.js';

const router = express.Router();

// test route
router.get('/', (req, res) => {
  res.send('responding with a resource for users route');
});

// register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword
    });

    await newUser.save();

    // create a fridge associated with this new user
    const defaultFridge = new Fridge({
      user: newUser._id,
      name: 'My Digital Fridge',
      createdAt: new Date()
    });

    await defaultFridge.save();

    // generate a token and send it back
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// login existing user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error(`Error during login: ${error}`);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;
