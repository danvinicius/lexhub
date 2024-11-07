import mongoose, { Mongoose } from 'mongoose';

const {DB_HOST, DB_NAME, DB_PORT} = process.env;

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

export const close = (): Promise<void> => mongoose.connection.close();