import ConversationModel from "../models/conversations.model.js";

async function findAll(userID) {
    const conversations = await ConversationModel.find({
        participants: { $in: [userID] },
    }).populate("participants", "profilePicture fullname username");

    return conversations;
}

async function findByParticipantIDs(participants) {
    const conversation = await ConversationModel.find({
        participants,
    }).populate("participants", "profilePicture fullname username");

    return conversation;
}

async function insert(participants, type, name = "") {
    const newConversation = await ConversationModel.create({
        participants,
        type,
        name,
    });
    return newConversation;
}

async function deleteConversation(conversationID) {
    await ConversationModel.findByIdAndDelete(conversationID);
}

const conversationsDB = {
    findAll,
    findByParticipantIDs,
    insert,
    deleteConversation,
};

export default conversationsDB;
