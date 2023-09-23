import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
