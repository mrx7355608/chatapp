import conversationServices from "../services/conversations.services.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

const getAllConversations = asyncErrorHandler(async (req) => {
    const myID = req.user._id;
    const conversations = await conversationServices.listMyAllConversations(
        myID
    );
    const formattedConvos = conversations.map((c) => {
        return {
            _id: c._id,
            participants: c.participants,
            createdAt: c.createdAt,
        };
    });
    return {
        statusCode: 200,
        message: "",
        data: formattedConvos,
    };
});

const getOneConversation = asyncErrorHandler(async (req) => {
    const myID = req.user._id;
    const friendID = req.params.id;
    const conversation = await conversationServices.listOneConversation([
        myID,
        friendID,
    ]);
    return {
        statusCode: 200,
        message: "",
        data: conversation,
    };
});

const postCreateNewConversation = asyncErrorHandler(async (req) => {
    const myID = req.user._id;
    const friendID = req.body.id;
    const participants = [myID, friendID];
    const newConversation = await conversationServices.addConversation(
        participants
    );
    return {
        statusCode: 201,
        message: "New conversation created successfully!",
        data: newConversation,
    };
});

const conversationsControllers = {
    getAllConversations,
    getOneConversation,
    postCreateNewConversation,
};

export default conversationsControllers;
