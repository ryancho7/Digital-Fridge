import mongoose from 'mongoose';

console.log('Creating User Schema');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    fridge: { type: mongoose.Schema.Types.ObjectId, ref: 'Fridge' } // Each user gets one fridge
});

console.log('Finished created User Schema');

export default mongoose.model('User', userSchema);