import express from 'express';
import helmet from 'helmet';
const server = express();
server.use(helmet({contentSecurityPolicy: false}))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
export default server;
