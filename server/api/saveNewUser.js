const router = require('express').Router();
const passport = require('../config/passport.config');

router.post('/', (req, res, next) => {
  passport.authenticate('local.register', (err, user, message) => {
    if (err) return next(err);
    if (!user && message) return res.json(message);
    if (!user && !message) return res.json({ message: 'Unknown error occurred' });
    res.cookie('access_token', user.access_token, {});
    res.json(user);
  })(req, res, next);
});

module.exports = router;
