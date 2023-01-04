import express, { json, urlencoded } from "express";
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from './routes/index'
import db from './config/database/database';
import { createRoles } from './libs/initialSetup';
import socket from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socket(server, { cors: { origin: "*" } });

createRoles();
//MIDDLEWARE
app.use(cors());
app.use(json());
app.use(urlencoded({ 
    extended: true
}));
app.use(morgan('dev'));
app.use('/api', indexRouter);

let socketsconecteds = 0;
io.on('connection', (socket) => {
    socketsconecteds++;
    io.sockets.emit('connecteds', {
        "userconecteds": socketsconecteds
    })
    console.log(socket.id)
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data)
    })
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })
    socket.on('disconnect', () => {
        socketsconecteds--;
        io.sockets.emit('connecteds', {
            "userconecteds": socketsconecteds
        })
        console.log(`DESCONECTANDO: ${socketsconecteds}`);
    })
});
export default server;
