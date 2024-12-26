import mongoose, { Mongoose } from 'mongoose';

const {MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_NAME, MONGO_PORT} = process.env;

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`);

export const close = (): Promise<void> => mongoose.connection.close();