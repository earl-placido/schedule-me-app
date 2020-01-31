require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api/api.js');

const app = express();
const port = process.env.SERVER_PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/', api);

app.listen(port, () => console.log(`schedule-me-up has started on port: ${port}`));