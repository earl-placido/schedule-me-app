require('dotenv').config();

// import node modules
const express = require('express');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const socketio = require('socket.io');
const swaggerUi = require('swagger-ui-express');

// json for defining our Swagger page
const swaggerDocument = require('./swagger.json');

// import server code & configs
const api = require('./api/api');
const errorHandler = require('./api/util/errorHandler');
const passportInit = require('./api/util/passportInit');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(passport.initialize());
passportInit(passport);

app.use(cors({
  origin: process.env.SERVER_ENV === 'production' 
    ? 'https://schedule-me-up.surge.sh/' : process.env.SERVER_ENV === 'develop' 
    ? 'https://schedule-me-up_dev.surge.sh/' : 'http://localhost:3000/'
}));

app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true 
}));

app.set('io', io);

app.use('/api', swaggerUi.serve);
app.get('/api', swaggerUi.setup(swaggerDocument));

app.use('/api/v1', api);
app.use(errorHandler.notFound);
app.use(errorHandler.serverError);

server.listen(process.env.SERVER_PORT || 8000, () => {
    console.log(`schedule-me-up has started on port: ${process.env.SERVER_PORT || 8000}`)
});