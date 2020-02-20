require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const api = require('./api/api.js');
const googleAuth = require('./auth/googleAuth.js');
const errorHandler = require('./api/util/errorHandler.js');

const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

googleAuth(passport);
app.use(passport.initialize());
    
app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect:'/'}),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.use('/api/v1', api);
app.use('/api', swaggerUi.serve);
app.get('/api', swaggerUi.setup(swaggerDocument));

app.use(errorHandler.notFound);
app.use(errorHandler.serverError);

app.listen(port, () => console.log(`schedule-me-up has started on port: ${port}`));