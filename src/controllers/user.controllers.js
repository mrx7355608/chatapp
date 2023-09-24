import userServices from "../services/user.services.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

const getAllUsers = asyncErrorHandler(async () => {
    const users = await userServices.listAllUsers();
    return {
        statusCode: 200,
        message: "",
        data: users,
    };
});

const getMe = asyncErrorHandler(async (req) => {
    const user = req.user;
    const trimmedUser = {
        _id: user._id,
        fullname: user.fullname,
        profilePicture: user.profilePicture,
        username: user.username,
        status: user.status,
    };

    return {
        statusCode: 200,
        message: "",
        data: trimmedUser,
    };
});

const userControllers = {
    getAllUsers,
    getMe,
};

export default userControllers;
