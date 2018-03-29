const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uuidv4 = require('uuid/v4');

const User = require('../models/user.js');

const options = { passReqToCallback: true };

const queryFunc = (user) => {
  return {
    access_token: user.access_token,
    username: user.username,
    id: user._id,
    firstName: user.firstName,
    image: user.image,
    surName: user.surName,
    middleName: user.middleName,
    password: user.password,
    permissionId: user.permissionId,
    permission: user.permission
  };
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('local.login',
  new LocalStrategy(options, (req, username, password, done) => {
    User.findOne({ username })
      .then(result => {
        if (result.validPassword(password)) {
          return result;
        } else done(null, false);
      })
      .then(user => {
        const token = uuidv4();
        user.access_token = token;
        user.save()
          .then(newUser => {
            const query = queryFunc(newUser);
            done(null, query);
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  })
);

passport.use('local.register', new LocalStrategy(options, (req, username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    } else if (user) {
      return done(null, false, { message: 'User already reported!' });
    }
    const { firstName, middleName, surName, permission } = req.body;
    const query = { username, firstName, middleName, surName, permission };
    query.password = User.hashPassword(password);
    query.permissionId = uuidv4();
    new User(query)
      .save()
      .then(user => {
        const token = uuidv4();
        user.access_token = token;
        user.save()
          .then(newUser => {
            const query = queryFunc(newUser);
            done(null, query);
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });
}));

module.exports = passport;
