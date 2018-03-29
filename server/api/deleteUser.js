const router = require('express').Router();
const User = require('../models/user.js');

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      user.remove()
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = router;
