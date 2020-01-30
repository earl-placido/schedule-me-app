const responses = require('../util/responses');

function exampleFunction1(req, res) {
    res.status(responses.SUCCESS).send('Example1');
}

function exampleFunction2(req, res) {
    res.status(responses.SUCCESS).send('Example2');
}

module.exports = {
   exampleFunction1,
   exampleFunction2
}