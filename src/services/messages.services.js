import messagesDB from "../data/messages.data.js";

async function listAllMessages(receiverID, senderID) {
    const messages = await messagesDB.findAll(receiverID, senderID);
    return messages;
}

async function addMessagesInBulk(messagesList) {
    const newMessages = await messagesDB.insertInBulk(messagesList);
    return newMessages;
}

const messageServices = {
    listAllMessages,
    addMessagesInBulk,
};

export default messageServices;
