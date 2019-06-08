var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  res.send({data:'haha'});
  console.log(haha)
});

module.exports = router;
