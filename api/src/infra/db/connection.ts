import mongoose, { Mongoose } from 'mongoose';

const {MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, MONGO_HOST, MONGO_NAME, MONGO_PORT} = process.env;

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(`mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`);

export const close = (): Promise<void> => mongoose.connection.close();