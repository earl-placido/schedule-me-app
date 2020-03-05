const express = require('express');
const passport = require('passport');
const tokenHelper = require('../util/tokenHelper');
const userModel = require('../model/userModel');
const responses = require('../util/responses');

const router = express.Router();
require('../util/passportInit')(passport);

router.route('/google')
    .post(passport.authenticate('google-token', {session: false}), (req, res, next) => {
        if (!req.user) {
            return res.send(responses.UNAUTHORIZED, 'User Not Authenticated');
        }

        let googleUser = req.user;

        userModel.getUserByEmail(googleUser.emails[0].value).then(user => {
            let userID;
            // create new google login user
            if(user === undefined || user.length == 0) {
                return userModel.createGoogleUser(googleUser.displayName, googleUser.emails[0].value, 'google', googleUser.id)
                    .then(id => userID = id)
                    .catch(next);
            }
            else {
                userID = user[0].UserId;
            }

            req.auth = { id: userID };

            next();
        }).catch(next);
    }, tokenHelper.createToken, tokenHelper.sendToken);

router.route('/signup')
    .post((req, res, next) => {
        let newUser = req.body;

        if(!validateEmailFormat(newUser.email)) {
            return res.status(responses.UNAUTHORIZED).json({err: 'Email format invalid' });  
        }

        if(!validatePasswordFormat(newUser.password)) {
            return res.status(responses.UNAUTHORIZED).json({err: 'Password format invalid. Length must be between 8 and 100 characters.' });  
        }

        userModel.getUserByEmail(newUser.email).then(user => {
            
            // create new user
            if (user === undefined || user.length == 0) {
                return userModel.createUser(newUser.email, newUser.password)
                    .then(userID => {
                        req.auth = { id: userID };
                        next();
                    })
                    .catch(next);
            } 
            else {
                return res.status(responses.UNAUTHORIZED).json({err: 'Email address entered is taken.'});
            }
        }).catch(next);
    }, tokenHelper.createToken, tokenHelper.sendToken);

router.route('/login')
    .post((req, res, next) => {
        let user = req.body;

        if(!validateEmailFormat(user.email)) {
            return res.status(responses.UNAUTHORIZED).json({err: 'Email format invalid' });  
        }

        if(!validatePasswordFormat(user.password)) {
            return res.status(responses.UNAUTHORIZED).json({err: 'Password format invalid. Length must be between 8 and 100 characters.' });  
        }

        userModel.validateUser(user.email, user.password).then(result => {
            if (!result.isValid) {
                return res.status(responses.UNAUTHORIZED).json({err: result.msg});
            }
            
            req.auth = { id: result.userId };

            next();
        }).catch(next);
    }, tokenHelper.createToken, tokenHelper.sendToken);


function validateEmailFormat(email) {
    let validFormat = /\S+@\S+\.\S+/.test(String(email).toLowerCase());
    return validFormat;
}

function validatePasswordFormat(password) {
    let validFormat = password.length >= 8 && password.length <= 100;
    return validFormat;
}

module.exports = router;