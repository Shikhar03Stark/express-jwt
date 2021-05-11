const passport = require('passport');
const jwt = require('jsonwebtoken');

const signUp = (req, res, next) => {
    const msg = {
        ok: true,
        message : `Sign up successfull`,
        user : req.user,
    }

    return res.status(200).json(msg);
    
}

const logIn = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(400).json({
                    ok: false,
                    error: `Invalid credentials`,
                })
            }
    
            req.login(user, {session: false}, async err => {
                if (err) {
                    return next(err);
                }   
                const body = {uid:user.uid, email:user.email};
                const token = jwt.sign({user:body}, process.env.SECRET || 'secret');
    
                return res.status(200).json({
                    ok: true,
                    token: token
                });
            })
        } catch (e) {
            return next(e);
        }

    })(req, res, next);
};

module.exports.signUp = signUp;
module.exports.logIn = logIn;