import { Logger } from '@/utils/logger/logger';
import dotenv from 'dotenv';

/**
 * SETTING ENV FILE
*/

Logger.info('environment: ' + process.env.NODE_ENV);
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * APPLICATION PORT
 */
const PORT = process.env.PORT


/**
 * DATABASE CONFIG
 */
const {MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, MONGO_HOST, MONGO_NAME, MONGO_PORT} = process.env;

const authSource = 'admin';
const authentication = process.env.NODE_ENV === 'development' ? '' : `${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@`;
const CONNECTION_STRING =`mongodb://${authentication}${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=${authSource}`

/**
 * AUTH CONFIG
 */
const AUTH_SECRET = process.env.AUTH_SECRET
const HASH_SALT = process.env.AUTH_SECRET


export {
    PORT,
    CONNECTION_STRING,
    AUTH_SECRET,
    HASH_SALT,
}