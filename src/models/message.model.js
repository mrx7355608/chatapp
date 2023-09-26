import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        // I added this field so that I can verify, whether or not the
        // actual sender of the message is deleting his message.
        sender_id: {
            type: String,
            required: true,
        },

        // It helps in organizing messages and ease their management
        conversation_id: {
            type: String,
            required: true,
        },

        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
