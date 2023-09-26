import conversationsDB from "../data/conversation.data.js";
// import validator from "validator";
import ApiError from "../utils/ApiError.js";

async function listOneConversation(participantsIDs) {
    // TODO: validate participants IDs
    const convo = await conversationsDB.findByParticipantIDs(participantsIDs);
    if (convo === null) {
        throw new ApiError("Conversation not found", 404);
    }
    return convo;
}

async function listMyAllConversations(myID) {
    const conversations = await conversationsDB.findAll(myID);
    return conversations;
}

async function addConversation(participants) {
    const newConversation = await conversationsDB.insert(
        participants,
        "one-to-one"
    );
    return newConversation;
}

const conversationServices = {
    listMyAllConversations,
    listOneConversation,
    addConversation,
};

export default conversationServices;
