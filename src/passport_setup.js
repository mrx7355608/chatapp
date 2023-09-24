import { Strategy } from "passport-local";
import UserModel from "./models/user.model.js";

export default function (passport) {
    passport.use(
        new Strategy(async function (username, password, done) {
            const user = await UserModel.findOne({ username });
            if (!user) return done(null, false);

            const isValidPassword = await user.verifyPassword(password);
            if (!isValidPassword) {
                return done(null, false, {
                    message: "Password or Username is incorrect",
                });
            }
            return done(null, user);
        })
    );

    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        const user = await UserModel.findById(id);
        return done(null, user);
    });
}
