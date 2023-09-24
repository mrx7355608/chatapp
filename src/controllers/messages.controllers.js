import messagesServices from "../services/messages.services.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

const getMyMessages = asyncErrorHandler(async (req) => {
    const myId = req.user._id;
    const receiverId = req.params.id;
    const myMessages = await messagesServices.listMyMessages(myId, receiverId);
    return {
        statusCode: 200,
        message: "",
        data: myMessages,
    };
});

const messagesControllers = {
    getMyMessages,
};

export default messagesControllers;
