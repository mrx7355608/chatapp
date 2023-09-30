import { config } from "dotenv";
config();
import sessions from "express-session";
import connectMongo from "connect-mongodb-session";

const MongoStore = connectMongo(sessions);
const mongoDBStore = new MongoStore({
    uri: process.env.DB_URL,
    collection: "sessions",
});

const sessionMiddleware = sessions({
    secret: "changeit",
    resave: false,
    saveUninitialized: false,
    store: mongoDBStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
});

export default sessionMiddleware;
