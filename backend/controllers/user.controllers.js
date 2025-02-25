const { Users } = require("../models/user.model");
const { generateToken } = require("../authorization/tokenGeneration")




const registerUser = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        // Validate request body
        if (!req.body.name || !req.body.email || !req.body.phoneNumber) {
            return res.status(400).send({ message: "All fields are required." });
        }


        // Check if email already exists
        const existingUser = await Users.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already exists." });
        }


        // Create a new user
        const user = await Users.create(req.body);
        const tokenGeneration = generateToken({ payload: user._id });
        res.status(201).send({
            successMessage: "User created successfully",
            user: user,
            token: tokenGeneration
        });

    } catch (error) {
        console.error("Error in registerUser:", error); // Debugging line
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
};



const getAllUsers = async (req, res) => {
    const loggedInUser = req.user;
    //console.log(req.user)
    const allUsers = await Users.find();
    try {
        if (!allUsers) {
            res.status(400).send({ message: "No users found !!" })
        }
        else {
            // send all the users except logged in user
            let filteredUsers = allUsers.filter((user) => user._id.toString() !== loggedInUser);
            res.status(200).send(filteredUsers); 
        }
    }
    catch (error) {
        console.error("Error in registerUser:", error); // Debugging line
        res.status(500).send({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = { registerUser, getAllUsers };
