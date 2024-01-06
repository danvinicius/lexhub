import express from 'express'; 
const server = express(); 
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
export default server