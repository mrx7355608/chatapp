import express from "express";
import sessionMiddleware from "./middlewares/sessions.js";
import passport from "passport";
import passport_setup from "./passport_setup.js";
import morgan from "morgan";
import UserModel from "./models/user.model.js";
import cors from "cors";
import { catch404, globalErrorHandler } from "./utils/errorHandlers.js";
import authRouter from "./routes/auth.routes.js";

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

// ROUTES
app.use("/auth", authRouter);

app.get("/me", (req, res) => {
    return res.status(200).json({
        ok: true,
        data: req.user,
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
