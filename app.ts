import express from "express";
import { createServer} from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from 'config';

import socket from './controllers/socketsimple'
import { version } from './package.json';
import router from "./routes/route";

const port = config.get<number>('PORT');
const host = config.get<string>('HOST');
const corsOrigin = config.get<string>('CORSORIGIN');

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors :{
        origin: corsOrigin,
        credentials: true
    },
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

httpServer.listen(port, host, () => {
    console.log(`🚀 Chat Server version: ${version} is listening 🚀 `);
    console.log(`http://${host}:${port}`);
    socket({io});
})