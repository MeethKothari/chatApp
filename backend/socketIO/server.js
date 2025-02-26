const {Server} = require("socket.io");
const http = require("http");
const express = require("express");




const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", 'http://localhost:5174', "https://chat-app-chi-puce.vercel.app" ], // Allow both localhost & vercel
        method: ["GET", "POST"]
    }
});




const users = {}

// code for real time messages
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}


io.on("connection", (socket) => {
    console.log("New client added", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId){
        users[userId] = socket.id
        console.log("Users online:", users);
    }

    // to check which user is online
    io.emit("getonline", Object.keys(users))


    socket.on("sendMessage", (message) => {
        console.log("New message received on server:", message);
        io.emit("newMessage", message); // Broadcast the new message
    });

    socket.on("disconnect", () => {
        console.log("client disconnected", socket.id);
        if (userId) {
            delete users[userId];
            io.emit("getonline", Object.keys(users));
        }
    });
});



module.exports = {app, io, server, getReceiverSocketId};
