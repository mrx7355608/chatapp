import userServices from "./services/user.services.js";

export default function socketHandler(io) {
    io.on("connection", async (socket) => {
        const { session } = socket.request;
        const userId = session.passport.user;

        socket.join(userId);

        io.emit("new connection", userId);

        // await userServices.updateUserState(userId, "Online");

        socket.on("private message", (data) => {
            socket
                .to(data.receiver_id)
                .to(data.sender_id)
                .emit("private message", data);
        });

        socket.on("disconnect", async () => {
            io.emit("user disconnected", userId);
            // await userServices.updateUserState(userId, "Offline");
        });
    });
}
