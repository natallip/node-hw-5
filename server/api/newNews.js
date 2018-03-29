const router = require('express').Router();
const News = require('../models/news.js');
const User = require('../models/user.js');

const queryFunc = (news, user) => {
  console.log(222, news, user);
  return {
    id: news._id,
    theme: news.theme,
    text: news.text,
    date: news.date,
    // userId: user.access_token,
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

router.post('/', (req, res, next) => {
  new News(req.body)
    .save()
    .then(result => {
      return News.find()
        .then(posts => posts)
        .catch(err => next(err));
    })
    .then(posts => {
      if (posts.length < 1) return res.json(posts);

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
