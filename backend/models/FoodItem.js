import mongoose from 'mongoose';

console.log('Creating FoodItem Schema')

const foodItemSchema = new mongoose.Schema({
    fridge: { type: mongoose.Schema.Types.ObjectId, ref: 'Fridge', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true},
    quantity: { type: Number, default: 1},
    unit: { type: String },
    expirationDate: { type: Date, required: true }
});

console.log('Finished created FoodItem Schema');

export default mongoose.model('FoodItem', foodItemSchema);