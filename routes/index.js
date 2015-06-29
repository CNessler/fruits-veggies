var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var functions = require('../lib/javascript/markets.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  // var button = req.body.button
  // var input = req.body.search
  // if (input){
  // button.addEventListener('click', function () {
  //   unirest
  //     .get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + input)
  //     .end(function (response) {
  //       console.log(response.body);
  //       res.render('index', {response: response.body.results})
  //     })
  //   })
  //   }
  res.render('index')
});

router.post('/', function (req, res, next) {
  var input = req.body.search;
    unirest
    .get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=' + input)
    // .header('Accept', 'application/json')
    // iterate through those ids and make api calls to retrieve individual market info
    // return an array of markets and their info to be displayed in view
    .end(function (response) {
       var ids = functions.getIds(response.body.results); // returns an array of market ids
      // console.log(ids);
        var max = ids.length;
        var info = [];
        for (var i = 0; i < ids.length; i++) {
          unirest
          .get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + ids[i])

            //  .header('Accept', 'application/json')
            .end(function (response) {
              // console.log(response.body.marketdetails);
              if(info.length < max){
                info.push(response.body)
              }

                console.log("*******************");
                console.log("*******************");
                console.log(info);
            })
        } // returns an array of market objects
              res.render('index', {marketInfo: info});
    })
  // , {marketInfo: markets});
  // pass the array of market objects to your view );
});

module.exports = router;
