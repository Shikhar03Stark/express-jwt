const passport = require('passport');
const jwt = require('jsonwebtoken');

const signUp = (req, res, next) => {
    const msg = {
        ok: true,
        message : `Sign up successfull`,
        user : req.user,
    }

    res.status(200).json(msg);
    next();
}

const logIn = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        try {
            if (err || !user) {
                console.log(`Error Occured`);
                return next(err);
            }
    
            req.login(user, {session: false}, err => {
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