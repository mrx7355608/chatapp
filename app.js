import express from "express";
import sessionMiddleware from "./middlewares/sessions.js";
import passport from "passport";
import passport_setup from "./passport_setup.js";
import morgan from "morgan";
import UserModel from "./models/user.model.js";
import cors from "cors";
import { catch404, globalErrorHandler } from "./utils/errorHandlers.js";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sessionMiddleware);
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport_setup(passport);

app.post("/register", async (req, res) => {
    const { fullname, username, password } = req.body;
    const newUser = await UserModel.create({
        fullname,
        username,
        password,
    });

    return res.status(201).json({ ok: true, data: newUser });
});

app.post("/login", (req, res) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) {
            return res
                .status(500)
                .json({ ok: false, error: "Internal server erro" });
        }
        if (!user && !info) {
            return res
                .status(404)
                .json({ ok: false, error: "Account not found" });
        }
        if (info) {
            return res.status(400).json({ ok: false, error: info.message });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res
                    .status(500)
                    .json({ ok: false, error: "Internal server erro" });
            }
            return res.status(200).json({ ok: true, data: user });
        });
    })(req, res);
});

app.use((req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ ok: false, error: "Un-authorized" });
});

app.get("/me", (req, res) => {
    return res.status(200).json({
        ok: true,
        data: req.user,
    });
});

app.post("/logout", (req, res) => {
    req.logOut((err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                error: "INTERNAL SERVER ERROR",
            });
        return res.status(200).json({
            ok: true,
            message: "Logged out successfully",
        });
    });
});

app.get("/all-users", async (req, res) => {
    const users = await UserModel.find();
    return res.status(200).json({ ok: true, data: users });
});

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export default app;
