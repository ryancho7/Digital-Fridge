import mongoose from "mongoose";
import User from './User.js';
import Fridge from './User.js';
import FoodItem from './User.js';

// connect to mongodb
console.log("conecting to mongodb");
await mongoose.connect(process.env.MONGO_URI);
console.log("Successfully connected to mongodb");

const models = {
    User,
    Fridge,
    FoodItem
};

export default models;