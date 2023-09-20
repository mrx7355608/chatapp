import express from 'express'
import sessionMiddleware from './middlewares/sessions.js'
import passport from 'passport'
import passport_setup from './passport_setup.js'
import usersDB from './data/users.js'
import morgan from 'morgan'

const app = express();

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(sessionMiddleware)
// PASSPORT
app.use(passport.initialize())
app.use(passport.session())
passport_setup(passport)


app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const newUser = usersDB.addUser(username, password);
    return res.status(201).json({ status: "success", data: newUser });
})

app.post("/login", (req, res) => {
    passport.authenticate("local", function(err, user, info) {
        req.logIn(user, function() {
            return res.status(200).json({
                status: "success",
                data: user
            })
        })
    })(req, res)
})
 
app.use((req, res, next) => {
    if(req.isAuthenticated()) return next();
    return res.status(401).json({
        status: "failed",
        error: "un-authorized"
    })
})   

app.get("/me", (req, res) => {
    return res.status(200).json({
        status: "success",
        data: req.user
    })
})

export default app;
