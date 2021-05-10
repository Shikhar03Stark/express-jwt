const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../model/User');
const util = require('../util/util');

passport.use(
    'signup', 
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const user = await User.create({
                email: email,
                password: password,
            })

            return done(null, user);
        }
        catch (e) {
            return done(e);
        }
    }
    )
);

passport.use(
    'login', 
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (email, password, done) => {
        try {
            const user = await User.findOne({where: {email: email}});
            console.log(`${__filename}: user : ${JSON.stringify(user)}`);
            if (!user) {
                //user not found
                return done(null, false, {message: 'User not found'});
            }
            const validate = await util.isValidPassword(password, user.password);

            if (validate) {
                return done(null, user, {message:'Logged in Successfully'});
            }
            else{
                return done(null, false, {message: 'Password did not match'});
            }
        } catch (e) {
            return done(e);
        }
    }
    )
);

passport.use(
    new JWTStrategy({
        secretOrKey: process.env.SECRET || 'secret',
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    (token, done) => {
        try {
            return done(null, token.user);
        } catch (e) {
            return done(e);
        }
    }
    )
)

module.exports = passport;