import express from "express";
import sessionMiddleware from "./middlewares/sessions.js";
import passport from "passport";
import passport_setup from "./passport_setup.js";
import morgan from "morgan";
import cors from "cors";
import { catch404, globalErrorHandler } from "./utils/errorHandlers.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import conversationRouter from "./routes/conversations.routes.js";

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
app.use("/users", userRouter);
app.use("/conversations", conversationRouter);

// ERROR HANDLERS
app.use(catch404);
app.use(globalErrorHandler);

export default app;
