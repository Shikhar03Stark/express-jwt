const auth = require('../../controller/auth/auth');
const passport = require('passport');
const router = require('express').Router();


/**
 * route : /auth/signup
 * method : POST
 */
router.post('/signup', passport.authenticate('signup', {session: false}), auth.signUp);

/**
 * route : /auth/login
 * method : GET
 */
router.post('/login', auth.logIn);


module.exports = router;