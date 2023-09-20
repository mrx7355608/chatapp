export default function socketHandler(io) {
    io.on("connection", (socket) => {
        const session = socket.request.session;
        console.log("Socket ID:", socket.id);
        console.log("Session ID:", session.sessionID);
        console.log("User ID:", session.passport.user);
    })
}
