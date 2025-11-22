import { Strategy as LocalStrategy } from 'passport-local';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { log } from 'console';

async function isValidPassword (user, password) {
    return await bcrypt.compare(password, user.passwordHash);
};


function login (passport) {
    passport.use(
        'login',
        new LocalStrategy(
            {
                passReqToCallback: true
            },
            async function (req, username, password, done) { 
                try {
                    const user = await userModel.User.findOne({ username: username });

                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        return done(null, false, { message: 'User Not found.' }); 
                    }
                    
                    if (!await isValidPassword(user, password)) { 
                        console.log('Invalid Password');
                        return done(null, false, { message: 'Invalid Password' });
                    }
                    
                    return done(null, user);

                } catch (err) {
                    return done(err); 
                }
            }
        )
    );
};

export default login;