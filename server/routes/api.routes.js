const path = require('path');
const router = require('express').Router();
// const index = path.join(process.cwd(), 'views/index.html');

router.use('/login', require('../api/login.js'));
router.use('/authFromToken', require('../api/authFromToken.js'));
router.use('/saveNewUser', require('../api/saveNewUser.js'));
router.use('/saveUserImage', require('../api/saveUserImage.js'));
router.use('/newNews', require('../api/newNews.js'));
router.use('/getNews', require('../api/getNews.js'));
router.use('/getUsers', require('../api/getUsers.js'));
router.use('/updateUserPermission', require('../api/updateUserPermission.js'));
router.use('/updateNews', require('../api/updateNews.js'));
router.use('/updateUser', require('../api/updateUser.js'));
router.use('/deleteUser', require('../api/deleteUser.js'));
router.use('/deleteNews', require('../api/deleteNews.js'));
// Redirecting all requests to 'index.html'
// router.use((req, res, next) => {
//   res.sendFile(index);
// });
router.use('/', (req, res, next) => {
  const url = path.join('api', req.url);
  const message = `${req.method} ${url} route is not served.`;
  next({ status: 404, message: message });
});

module.exports = router;
