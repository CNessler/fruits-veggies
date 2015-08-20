var unirest = require('unirest');

module.exports = {
  
  getIds: function(input) {
    var marketIds = [];
    for (var i = 0; i < input.length; i++) {
      marketIds.push(input[i].id);
    }
    return marketIds;
  },

  errorCheck: function (input) {
    var emptyZip = "Please enter a valid zip code.";
    var spaces = "No spaces allowed in zip code.";
    var errors = [];
    if (input === ''){
      errors.push(emptyZip)
    }
    if (input.match(/\s/i)) {
      errors.push(spaces)
    }
    if (input.length < 5){
      errors.push(emptyZip)
    }
    return errors;
  }
}
