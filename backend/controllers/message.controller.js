const {Messages} = require("../models/message.model");
const {Conversations} =require("../models/conversation.model");
const mongoose = require("mongoose");
const { io, getReceiverSocketId } = require("../socketIO/server");

/*
  1.sender id will be present in local itself as we are authorizing the token and adding it to req.user
  2.receiver id will be in the params as we dont know to whom we are going to send message so sending and getting messages (dynamically)  
*/



// send messages to the receiver(person)
const sendMessage = async(req, res) => {
    try{
        const {message} = req.body; // destructured value
        console.log('Message :', message); //how are you....

        const {id: receiverId} = req.params; // receivers id
        console.log("Receiver :", receiverId) //67baeb579d4ca0f716cb2868

        const senderId = req.user; // senders id (logged in user)
        console.log("Sender :", senderId) // 67bbe2b0a23341f219e678d5

        // const senderObjectId = new mongoose.Types.ObjectId(senderId);
        // const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        let conversation = await Conversations.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            // Create new conversation if not found
            conversation = new Conversations({
                participants: [senderId, receiverId],
                message: []
            });

            await conversation.save();
        }

        // Create new message
        const newMessage = new Messages({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });

        await newMessage.save();

        // Push the message to the conversation
        conversation.message.push(newMessage._id);
        await conversation.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        res.status(201).send(newMessage);
    }
    catch(error){
        console.log("Error in sending message :", error);
        res.status(500).send({ message: error.message })
    }
}





// get all the messages between the participants
const getMessage = async(req, res) => {
    try {
        const { id: receiverId } = req.params; // receiver's ID
        console.log("Receiver :", receiverId); // Receiver : 67baeb579d4ca0f716cb2868

        const senderId = req.user; // sender's ID (logged-in user)
        console.log("Sender :", senderId); // Sender : 67bc35039a5b77fe15647be1


        // Find the conversation with both sender and receiver
        const conversation = await Conversations.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("message");
        console.log('conversationsss :', conversation) // conversationsss : null

        // If conversation is not found, return early to prevent further execution
        if (!conversation) {
            return res.status(200).send({ message: "No conversation found" });
        }

        const messages = conversation.message;
        console.log("Messages :", messages);

        res.status(200).send(messages);

    } catch (error) {
        console.error("Error in getting message:", error);
        res.status(500).send({ message: "Internal server error" });
    }
}



module.exports = {sendMessage, getMessage}