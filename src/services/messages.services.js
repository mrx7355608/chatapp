import messagesDB from "../data/messages.data.js";

async function listMyMessages(myId, receiverId) {
    const myMessages = await messagesDB.findMyMessages(myId, receiverId);
    return myMessages;
}

async function addNewMessages(messages) {
    const newMessages = await messagesDB.insertInBulk(messages);
    return newMessages;
}

const messagesServices = {
    listMyMessages,
    addNewMessages,
};

export default messagesServices;
