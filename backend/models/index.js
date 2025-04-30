import mongoose from "mongoose";
import User from './User.js';
import Fridge from './Fridge.js';
import FoodItem from './FoodItem.js';

console.log("Connecting to mongodb");
await mongoose.connect(process.env.MONGO_URI);
console.log("Successfully connected to mongodb");

const models = {
    User,
    Fridge,
    FoodItem
};

export default models;