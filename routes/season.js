var express = require('express');
var router = express.Router();

router.get('/spring', function (req, res, next) {
  res.render('season/spring');
})

router.get('/fall', function (req, res, next) {
  res.render('season/fall')
})
router.get('/summer', function (req, res, next) {
  res.render('season/summer')
})
router.get('/winter', function (req, res, next) {
  res.render('season/winter')
})

module.exports = router;
