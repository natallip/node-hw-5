const router = require('express').Router();
const User = require('../models/user.js');

router.post('/', (req, res, next) => {
  const token = req.cookies.access_token || req.body.access_token;
  User.findOne({ access_token: token })
    .then(result => {
      if (!result) throw new Error('No user found!');
      res.json(result);
      // return result;
    })
    .catch(err => next(err));
});

module.exports = router;
