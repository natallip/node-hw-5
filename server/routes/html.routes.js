const path = require('path');
const index = path.join(process.cwd(), 'views/index.html');
const router = require('express').Router();

router.use((req, res, next) => {
  res.sendFile(index);
});

module.exports = router;
