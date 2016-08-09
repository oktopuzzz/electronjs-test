var staticDataProvider = require('./static-data-provider');
var fsp = require('fs-promise');

var staticData = {};

staticData.country = function() {
  return fsp.readJson(staticDataProvider.country);
};

staticData.federals = function() {
  return fsp.readJson(staticDataProvider.federals);
};

staticData.regions = function() {
  return fsp.readJson(staticDataProvider.regions);
};

module.exports = staticData;