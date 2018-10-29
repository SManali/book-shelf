const express = require('express');
const { authorDetail } = require('../api/good-read');

const router = express.Router();

router.get('/:authorId', (req, res) => {
  const authorId = req.params.authorId;
  authorDetail(authorId).then(data => {
    res.status(200).json(data);
  }, err => {
    res.status(err.status);
  })
});

module.exports = router;