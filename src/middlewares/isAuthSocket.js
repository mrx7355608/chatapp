export const isAuth = (socket, next) => {
    const { passport } = socket.request.session;
    if (!passport) {
        return next(new Error("Not authenticated"));
    }

    socket.userId = passport.user;
    return next();
};
