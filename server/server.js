require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const api = require('./api/api.js');

const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/', api);
app.use('/api', swaggerUi.serve);
app.get('/api', swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`schedule-me-up has started on port: ${port}`));