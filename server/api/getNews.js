const router = require('express').Router();
const News = require('../models/news.js');
const User = require('../models/user.js');

const queryFunc = (news, user) => {
  return {
    id: news._id,
    theme: news.theme,
    text: news.text,
    date: news.date,
    user: {
      access_token: user.access_token,
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      surName: user.surName,
      middleName: user.middleName,
      image: user.image
    }
  };
};

router.get('/', (req, res, next) => {
  News.find()
    .then(posts => {
      if (!posts.length) return res.json(posts);
      const array = [];
      const length = posts.length - 1;
      posts.forEach((post, index) => {
        User.findById(post.userId)
          .then(user => {
            array.push(queryFunc(post, user));
            if (length === index) res.json(array);
          })
          .catch(err => next(err));
      });
    })
    .catch(err => next(err));
});

module.exports = router;
