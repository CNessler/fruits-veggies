var unirest = require('unirest');

module.exports = {
  getMarket: function(idArray) {
    var info = [];
    for (var i = 0; i < idArray.length; i++) {
      unirest
        .get('http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=' + idArray[i])
        .end(function (response) {
          // return response.body
          info.push(response.body.marketdetails)
          // console.log(response.body.marketdetails);
        })
          // return info.push(response.body);
        }
        return info;
    // iterate over the array of market ids
    // pass each id into the api call to get individual market info
    // unirest
    // http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=1004691
    // return an array of market objects
  },

  getIds: function(input) {
    var marketIds = [];
    for (var i = 0; i < input.length; i++) {
      marketIds.push(input[i].id);
    }
    return marketIds;
    // console.log(marketIds);
    // iterate over the first api call results
    // return an array of market ids
  }
}
