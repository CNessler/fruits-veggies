var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var functions = require('../lib/javascript/markets.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.post('/', function (req, res, next) {
  var input = req.body.search;
    var validation = functions.errorCheck(input)
    if (validation.length > 0) {
      res.render('index', {errors: validation})
    }

    unirest
    .get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + input)
    .end(function (response) {
        var ids = functions.getIds(response.body.results);
        var max = ids.length;
        var info = [];
        for (var i = 0; i < ids.length; i++) {
          unirest
          .get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + ids[i])
            .end(function (response) {
              if(info.length < max){
                info.push(response.body)
              }
              if (info.length >= max){
                res.render('index', {marketInfo: info});
            }
            })
        }
    })
});

module.exports = router;
