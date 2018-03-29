const router = require('express').Router();
const uuidv4 = require('uuid/v4');
const User = require('../models/user.js');

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  User.findOne({ permissionId: id })
    .then(user => {
      const permission = req.body.permission;

      for (let item in permission) {
        for (let sub in permission[item]) {
          user.permission[item][sub] = permission[item][sub];
        }
      }

      user.permissionId = uuidv4();
      user.save()
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = router;
