const express = require('express');
const app = express();
const api = require('./api/api.js');

const port = process.env.SERVER_PORT || 3000;

app.use('/api/', api);

app.listen(port, () => console.log(`schedule-me-up has started on port: ${port}`));