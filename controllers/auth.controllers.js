import userServices from "../services/auth.services.js";
import passport from "passport";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";

const postRegisterUser = asyncErrorHandler(async (req) => {
    const newUser = await userServices.register(req.body);
    return {
        statusCode: 201,
        message: "Thank you for signing up!",
        data: newUser,
    };
});

const postLoginUser = (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) return next(err);
        if (!user && !info) {
            return res
                .status(404)
                .json({ status: "failed", error: "Account not found" });
        }
        if (info) {
            return res
                .status(400)
                .json({ status: "failed", error: info.message });
        }

        req.logIn(user, function (err) {
            if (err) return next(err);

            const userDataLimited = {
                fullname: user.fullname,
                _id: user._id,
                profilePicture: user.profilePicture,
                username: user.username,
            };

            return res.status(200).json({
                status: "success",
                message: "Login successful",
                data: userDataLimited,
            });
        });
    })(req, res, next);
};

const postLogoutUser = (req, res, next) => {
    req.logOut((err) => {
        if (err) return next(err);
        return res.status(200).json({
            status: "success",
            message: "Logged out successfully",
            data: null,
        });
    });
};

const userControllers = {
    postRegisterUser,
    postLoginUser,
    postLogoutUser,
};

export default userControllers;
