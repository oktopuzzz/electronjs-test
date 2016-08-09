function getStaticRecource(name) {
  var resource = null;

  switch (name) {
    case "Country":
      resource =  electronApi.staticData.country;
      break;

    case "Federals":
      resource =  electronApi.staticData.federals;
      break;

    case "Regions":
      resource =  electronApi.staticData.regions;
      break;
  }

  return resource()
          .then(function(data) { return data; });
}