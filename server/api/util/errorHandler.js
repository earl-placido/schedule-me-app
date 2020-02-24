const responses = require('./responses');

function unauthorized(req, res) {
    res.status(responses.UNAUTHORIZED).json({
        status: responses.UNAUTHORIZED,
        err: 'Authentication failed.'
    });
    return;
}

function notFound(req, res) {
    res.status(responses.NOT_FOUND);
    res.send('Not found');
    return;
}

function serverError(err, req, res) {
    res.status(err.status || responses.SERVER_ERROR);
    res.send({ error: err.message });
    return;
}

function noTokenProvided(req, res) {
    res.status(responses.FORBIDDEN).json({
      status: responses.FORBIDDEN,
      err: 'No token provided.'
    });
    return;
}

module.exports = {
    unauthorized,
    notFound,
    serverError,
    noTokenProvided
}