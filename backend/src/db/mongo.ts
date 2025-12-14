import mongoose from 'mongoose';

export const connectMongo = async () => {
  if (!process.env.MONGODB_URI) return;

  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
};
