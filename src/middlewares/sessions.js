import session from 'express-session';

const sessionMiddleware = session({
    secret: "changeit",
    resave: false,
    saveUninitialized: false
})

export default sessionMiddleware;
