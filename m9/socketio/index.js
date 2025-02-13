const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {  //lets say we have total 500 clients
    io.emit('connection', 'a user is connected'); //send to all 500 clients
    socket.emit('connection', 'you are connected'); //send to the only ONE recently connected client
    socket.broadcast.emit('connection', 'a new user has just connected'); //send to 499 clients, except ONE recently connected client
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});