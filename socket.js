export default function socketHandler(io) {
    io.on("connection", (socket) => {
        const { session } = socket.request;
        const userId = session.passport.user;

        socket.join(userId);

        socket.on("private message", (data) => {
            console.log(data);
            socket.to(data.to).to(userId).emit("private message", data);
        });
    });
}
