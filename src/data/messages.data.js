import MessageModel from "../models/message.model.js";

async function findAll(receiver_id, myId) {
    const messages = await MessageModel.find({
        $or: [
            {
                receiver_id: receiver_id,
                sender_id: myId,
            },
            {
                sender_id: receiver_id,
                receiver_id: myId,
            },
        ],
    });
    return messages;
}

async function insertInBulk(messages) {
    const newMessages = await MessageModel.insertMany(messages);
    return newMessages;
}

const messagesDB = {
    findAll,
    insertInBulk,
};

export default messagesDB;
