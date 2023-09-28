import messageServices from "../services/messages.services.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

const getAllMessages = asyncErrorHandler(async (req) => {
    const receiverID = req.params.id;
    const myID = req.user._id;
    const messages = await messageServices.listAllMessages(receiverID, myID);
    return {
        statusCode: 200,
        message: "",
        data: messages,
    };
});

const messagesControllers = {
    getAllMessages,
};

export default messagesControllers;
