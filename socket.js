import { isAuth } from "./middlewares/isAuthSocket.js";
import userServices from "./services/user.services.js";
import morgan from "morgan";

let onlineUsers = [];
let disconnectionTimerId;

export default function socketHandler(io) {
    io.engine.use(morgan("dev"));

    // Middleware to allow authenticated requests only
    io.use(isAuth);

    io.on("connection", async (socket) => {
        const userId = socket.userId;

        // If user connects to socketServer for
        // the first time, update its status to "online"
        if (!onlineUsers.includes(userId)) {
            onlineUsers.push(userId);
            await userServices.updateUserState(userId, "Online");
            io.emit("user connected", userId);
        } else {
            // If user is already in connected clients then don't
            // update his status (used to handle page refresh on frontend)
            clearTimeout(disconnectionTimerId);
        }

        socket.join(userId);

        //
        // socket.on("private message", (data) => {
        //     socket
        //         .to(data.receiver_id)
        //         .to(data.sender_id)
        //         .emit("private message", data);
        // });

        socket.on("disconnect", async () => {
            disconnectionTimerId = setTimeout(async () => {
                onlineUsers = onlineUsers.filter((id) => id !== userId);
                await userServices.updateUserState(userId, "Offline");
                io.emit("user disconnected", userId);
                console.log("user disconnected");
            }, 8000);
        });
    });
}
