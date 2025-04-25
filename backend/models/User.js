import mongoose from 'mongoose';

console.log('Creating User Schema')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

console.log('Finished created User Schema');

export default mongoose.model('User', userSchema);