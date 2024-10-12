import mongoose, { Mongoose } from 'mongoose';

// docker run -p 27017:27017 -d mongo
export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect('mongodb://localhost:27017/cel');

export const close = (): Promise<void> => mongoose.connection.close();
