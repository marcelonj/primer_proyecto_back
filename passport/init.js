import login from './login.js';
import userModel from '../models/userModel.js';

function initPassport (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const user = await userModel.User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
    login(passport);
};

export default initPassport;