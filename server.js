const express = require('express')
const sql = require('./config/db')
require('dotenv').config();
const passport = require('passport');

const app = express()

const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
require('./config/passport');

app.get('/', (req, res) => {
    res.status(200).json({
        ok : true,
    })
})

app.use('/auth', require('./routes/auth/auth'));
//protected routes
app.use('/user', passport.authenticate('jwt', {session: false}), require('./routes/user/user'));
app.use('/product', passport.authenticate('jwt', {session: false}), require('./routes/product/product'));


//404
app.use((req, res, next) => {
    console.log(`Resource not found`);
    return res.status(404).json({
        ok: false,
        error: 'Resource not found',
        method: req.method,
    })
})
//error handler
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status || 500)
    .json({
        ok: false,
        error: err
    });
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})