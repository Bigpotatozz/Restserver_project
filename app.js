import dotenv from 'dotenv';
dotenv.config();
import  {Server}  from './model/server.js';


const servidor = new Server();

servidor.listen();
