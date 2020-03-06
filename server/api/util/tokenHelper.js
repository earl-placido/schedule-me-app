const jwt = require('jsonwebtoken');
const responses = require('./responses');

const SECRET_KEY = process.env.SECRET_KEY || 'supersecretkey';
const TOKEN_EXPIRY = '1d';

function createToken(req, res, next) {
    req.token = jwt.sign({userID: req.auth.id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
    return next();
}

function sendToken(req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(responses.SUCCESS).send(JSON.stringify(req.user));
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token ? token : authHeader, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(responses.FORBIDDEN);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(responses.UNAUTHORIZED);
    }
}

module.exports = {
    createToken,
    sendToken,
    authenticateToken
}