import { Strategy} from 'passport-local';
import usersDB from './data/users.js'

export default function (passport) {
    passport.use(new Strategy(
        function (username, password, done) {
            const user = usersDB.findByUsername(username);
            return done(null, user)
        }
    ))

    passport.serializeUser(function(user, done) {
        return done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        const user = usersDB.findUser(id);
        return done(null, user);
    })
}
