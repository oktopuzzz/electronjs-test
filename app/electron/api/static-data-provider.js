var path = require('path');
var apiRootPath = require('./root-dir')();

function data(file) {
  return path.resolve(apiRootPath, '..', '..', 'common', 'data', file);
}

var staticDataProvider = {
  country: data('country.topojson'),
  federals: data('federals.topojson'),
  regions: data('regions.topojson')
};

module.exports = staticDataProvider;