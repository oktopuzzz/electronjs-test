function getStaticRecource(name) {
  var resource = null;

  switch (name) {
    case "Country":
      resource = fetch('data/country.topojson');
      break;
              
    case "Federals":
      resource = fetch('data/federals.topojson');
      break;

    case "Regions":
      resource = fetch('data/regions.topojson');
      break;
  }

  return resource
          .then(function(data) { return urlResponseHandler.processResponse(data); });
}