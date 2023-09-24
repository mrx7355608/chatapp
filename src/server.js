import { config } from "dotenv";
config();
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import sessionMiddleware from "./middlewares/sessions.js";
import socketHandler from "./socket.js";
import { connectDatabase } from "./utils/dbconnection.js";

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

// Sockets
io.engine.use(sessionMiddleware);
socketHandler(io);

// Listening on port 8000
async function startServer() {
    await connectDatabase();

    httpServer.listen(8000, () => {
        console.log("express server started on port 8000");
    });
}

startServer();
