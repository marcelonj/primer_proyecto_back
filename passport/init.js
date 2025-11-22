import login from './login.js';
import userModel from '../models/userModel.js';

function initPassport (passport) {
    passport.serializeUser(function (user, done) {
        console.log('serializing user: ');
        console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        userModel.User.findById(id, function (err, user) {
            console.log('deserializing user:', user);
            done(err, user);
        });
    });
    login(passport);
};

export default initPassport;