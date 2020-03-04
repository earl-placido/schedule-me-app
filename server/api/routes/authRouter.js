const express = require('express');
const passport = require('passport');
const tokenHelper = require('../util/tokenHelper');
const userModel = require('../model/userModel');
const responses = require('../util/responses');

const router = express.Router();
require('../util/passportInit')(passport);

router.route('/auth/google')
    .post(passport.authenticate('google-token', {session: false}), (req, res, next) => {
        if (!req.user) {
            return res.send(responses.UNAUTHORIZED, 'User Not Authenticated');
        }

        userModel.getUserByEmail(req.user.emails[0].value).then(user => {
            if(user) {
            let userID;
            // create new google login user
            if(user === undefined || user.length == 0) {
                console.log('it goes here');
                userID = userModel.createGoogleUser(
                    req.user.displayName, 
                    req.user.emails[0].value,
                    'google',
                    req.user.id);
            }

            req.auth = {
                id: req.user.id
            };

            next();
        });
    }, tokenHelper.createToken, tokenHelper.sendToken);

module.exports = router;