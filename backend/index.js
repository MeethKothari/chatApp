const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
//const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes")
const messageRoutes = require("./routes/message.routes");
const {app, server} =require("./socketIO/server.js"); // socket IO
// ports
const port = process.env.PORT




// mongo connection
try{
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB !!")
}
catch(error){
    console.log({message: error})
}



// Middlewares
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://chat-app-chi-puce.vercel.app"], // Allow both localhost & vercel
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options("*", cors()); // Handle Preflight requests
app.use(express.json());



// routes
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);


server.listen(port, () => {
    console.log(`server is running on port : ${port}`)
})