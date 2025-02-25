const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    message: {
        type: String,
        required: true,
        maxLength: 1000,
        trim: true,
        validate: [
            {
                validator: (value) => value.length > 0,
                message: "Message can not be empty"
            },
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
}
)



const Messages = mongoose.model("messages", messageSchema);
module.exports = { Messages };