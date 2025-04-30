import mongoose from 'mongoose';

console.log('Creating Fridge Schema');

const fridgeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: 'My Digital Fridge' },
    createdAt: { type: Date, default: Date.now }
});

console.log('Finished created Fridge Schema');

export default mongoose.model('Fridge', fridgeSchema);