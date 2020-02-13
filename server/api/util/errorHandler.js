const responses = require('./responses');

function unauthorized(req, res, next) {
    res.status(responses.UNAUTHORIZED).json({
        status: responses.UNAUTHORIZED,
        err: 'Authentication failed.'
    });
    return;
}

function notFound(req, res, next) {
    res.status(responses.NOT_FOUND);
    res.send({ error: 'Not found.' });
    return;
};

function serverError(err, req, res, next) {
    res.status(err.status || responses.SERVER_ERROR);
    res.send({ error: err.message });
    return;
};

function noTokenProvided(req, res, next) {
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