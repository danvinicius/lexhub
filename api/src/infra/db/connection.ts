import mongoose, { Mongoose } from 'mongoose';
import { CONNECTION_STRING } from '@/config/env';
import { Logger } from '@/utils/logger/logger';

export const connect = async (): Promise<Mongoose | void> => {
  try {
    const connection = await mongoose.connect(CONNECTION_STRING);
    Logger.info('Conexão com o banco de dados estabelecida com sucesso!');
    return connection;
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};

export const close = (): Promise<void> => {
  console.log('Fechando conexão com o banco de dados...');
  return mongoose.connection.close();
};
