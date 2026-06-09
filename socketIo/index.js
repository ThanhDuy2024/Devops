const express = require('express');
const { Server } = require("socket.io");
const { createServer } = require('node:http');
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");
const { join } = require('node:path');
const port = 4000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

const main = async () => {
    const pubClient = createClient({
        url: "redis://redis:6379"
    });

    const subClient = pubClient.duplicate();

    await pubClient.connect();
    await subClient.connect();

    io.adapter(
        createAdapter(pubClient, subClient)
    );

    io.on("connection", (socket) => {
        console.log('a user connected');
        socket.on("disconnect", () => {
            console.log('user disconnected');
        });

        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
        });
    })
}

main();

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})