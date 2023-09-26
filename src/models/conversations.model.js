import mongoose from "mongoose";

const convoSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        // Can only be "one-to-one" OR "group"
        type: {
            type: String,
            required: true,
        },

        // Only for group chats
        name: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const ConversationModel = mongoose.model("Conversation", convoSchema);

export default ConversationModel;
