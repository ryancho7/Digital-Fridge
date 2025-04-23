import mongoose from "mongoose";

const models = {}

// connect to mongodb
console.log("conecting to mongodb");
await mongoose.connect(process.env.MONGO_URI);
console.log("Successfully connected to mongodb");

const userSchema = new mongoose.Schema({
username: String,
description: String
});

models.userSchema = mongoose.model('User', userSchema);

console.log('finished creating models');

export default models;

