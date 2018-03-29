const router = require('express').Router();
const passport = require('../config/passport.config.js');

router.post('/', (req, res, next) => {
  passport.authenticate('local.login', (err, user) => {
    if (err) return next(err);
    if (!user) return res.json({ message: 'Auth failed' });
    res.cookie('access_token', user.access_token);
    res.json(user);
  })(req, res, next);
});

module.exports = router;
