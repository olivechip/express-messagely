const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('../middleware/auth.js');
const { SECRET_KEY } = require('../config');
const ExpressError = require('../expressError');

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (await User.authenticate(username, password)){
            const token = jwt.sign({username}, SECRET_KEY)
            User.updateLoginTimestamp(username);
            return res.json({token});
        } else {
            throw new ExpressError('Invalid user credentials.', 400);
        }
    } catch (e){
        return next(e);
    }
});


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, first_name, last_name, phone } = req.body;
        if (await User.register(username, password, first_name, last_name, phone)){
            const token = jwt.sign({username}, SECRET_KEY)
            User.updateLoginTimestamp(username);
            return res.json({token});
        } else {
            throw new ExpressError('Username taken.', 400);
        }
    } catch (e){
        return next(e);
    }
});

module.exports = router;