import MessageModel from "../models/message.model.js";

async function insert(sender_id, receiver_id, text) {
    const newMessage = await MessageModel.create({
        sender_id,
        receiver_id,
        text,
    });
    return newMessage;
}

async function insertInBulk(messages) {
    const newMessages = await MessageModel.insertMany(messages);
    return newMessages;
}

async function findMyMessages(myId, receiverId) {
    const messages = await MessageModel.find({
        $or: [
            { sender_id: myId, receiver_id: receiverId },
            { receiver_id: myId, sender_id: receiverId },
        ],
    });
    return messages;
}

const messagesDB = {
    findMyMessages,
    insert,
    insertInBulk,
};

export default messagesDB;
