const mongoose = require("mongoose");


const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages",
            default: []
        }
    ]
},
    {
        timestamps: true
    }
)


const Conversations = mongoose.model("conversations", conversationSchema);
module.exports = { Conversations }