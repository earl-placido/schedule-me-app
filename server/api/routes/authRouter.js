const express = require('express');
const router = express.Router();
const passport = require('passport');

const googleAuth = passport.authenticate('google', { scope: ['profile'] });

const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

router.get('/google', addSocketIdtoSession, googleAuth);

router.get('/google/callback', googleAuth, (req) => {
  const io = req.app.get('io');
  const user = { 
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
  };
  io.in(req.session.socketId).emit('google', user);
});

module.exports = router;