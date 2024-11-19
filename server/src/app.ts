import express from 'express';
import { createServer } from 'http';
import config from "@/config";

import router from './routes';




async function startServer() {
    const app = express();

    require('./loaders').default({ app });

    const server = createServer(app);
    //add socket.io
    const io = require('./loaders/socket').initializeIO(server);
    server.listen(config.port, () => {
        console.log(`Server is running on http://localhost:${config.port}`);
    });
}

startServer();