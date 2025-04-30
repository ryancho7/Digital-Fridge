import mongoose from 'mongoose';

console.log('Creating FoodItem Schema');

const foodItemSchema = new mongoose.Schema({
    fridge: { type: mongoose.Schema.Types.ObjectId, ref: 'Fridge', required: true },
    name: { type: String, required: true },
    category: {
        type: String,
        enum: [
            'Produce',
            'Meat & Seafood',
            'Dairy & Eggs',
            'Beverages',
            'Leftovers & Prepared',
            'Condiments & Sauces'
        ],
        required: true
    },
    quantity: { type: Number, default: 1 },
    expirationDate: { type: Date, required: true }
});

console.log('Finished created FoodItem Schema');

export default mongoose.model('FoodItem', foodItemSchema);