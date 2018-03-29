const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const formidable = require('formidable');

const publicRoot = 'public';
const uploads = 'uploads';
const uploadsDir = path.join(process.cwd(), publicRoot, uploads);

((dir) => {
  const exist = fs.existsSync(dir);
  if (!exist) {
    fs.mkdir(dir, err => {
      if (err) throw err;
    });
  }
})(uploadsDir);

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const form = new formidable.IncomingForm();

  form.uploadDir = uploadsDir;
  form.parse(req, (err, fields, files) => {
    if (err) {
      try {
        const dir = files[id].path;
        const exist = fs.existsSync(dir);
        if (!exist) {
          fs.unlink(dir, err => {
            if (err) throw err;
          });
        }
      } catch (err) {
        return next(err);
      }
    }

    if (!files[id].path || !files[id].size) {
      return res.json({ message: 'No file!' });
    }
    const { path: dir, name } = files[id];
    const ext = path.extname(name);
    const timestamp = Date.now();
    const newFileName = timestamp + ext;

    try {
      const exist = fs.existsSync(dir);
      if (exist) {
        const newPath = path.join(uploadsDir, newFileName);
        fs.rename(dir, newPath, err => {
          if (err) throw err;

          const src = path.join(uploads, newFileName);
          res.json({ path: src });
        });
      }
    } catch (err) {
      return next(err);
    }
  });
});

module.exports = router;

