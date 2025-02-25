const {Server} = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();



const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        method: ["GET", "POST"]
    }
});



// code for real time messages
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}




const users = {}
io.on("connection", (socket) => {
    console.log("New client added", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId){
        users[userId] = socket.id
        console.log("Helllooooo", users);
    }

    // to check which user is online
    io.emit("getonline", Object.keys(users))

    socket.on("disconnect", () => {
        console.log("client disconnected", socket.id);
        delete users[userId];
        io.emit("getonline", Object.keys(users))
    });
});



module.exports = {app, io, server, getReceiverSocketId};
