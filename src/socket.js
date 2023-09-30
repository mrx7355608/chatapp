import { isAuth } from "./middlewares/isAuthSocket.js";
import userServices from "./services/user.services.js";
import messagesServices from "./services/messages.services.js";

let onlineUsers = [];
let messages = [];
let disconnectionTimerId;

export default function socketHandler(io) {
    // Middleware to allow authenticated requests only
    io.use(isAuth);

    // Adds messages in database after every 20 seconds
    setInterval(async () => {
        if (messages.length > 0) {
            console.log("adding messages in database");
            await messagesServices.addMessagesInBulk(messages);
            messages = [];
        } else {
            console.log("No messages were found");
        }
    }, 20000);

    io.on("connection", async (socket) => {
        const userId = socket.userId;

        socket.join(userId);

        // ------- PAGE REFRESH / RELOAD HANDLING LOGIC -------
        // TODO: write description of what below functionality does and how
        if (!onlineUsers.includes(userId)) {
            onlineUsers.push(userId);
            await userServices.updateUserState(userId, "Online");
            io.emit("user connected", userId);
            console.log("USER CONNECTED");
        } else {
            // If user is already in connected clients then don't
            // update his status (used to handle page refresh on frontend)
            clearTimeout(disconnectionTimerId);
            console.log("USER RECONNECTED");
        }

        socket.on("private message send", (messageObject) => {
            socket
                .to(messageObject.receiver_id)
                .to(userId)
                .emit("private message received", messageObject);
            messages.push(messageObject);
        });

        socket.on("disconnect", async () => {
            disconnectionTimerId = setTimeout(async () => {
                onlineUsers = onlineUsers.filter((id) => id !== userId);
                await userServices.updateUserState(userId, "Offline");
                io.emit("user disconnected", userId);
                console.log("USER DISCONNECTED");
            }, 8000);
        });
    });
}
