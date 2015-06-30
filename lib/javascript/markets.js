var unirest = require('unirest');

module.exports = {
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
