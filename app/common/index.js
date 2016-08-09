var initMap = function() {
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmLayer = L.tileLayer(osmUrl);

	var map = L.map('map',
        {
            center: [60, 90],
            minZoom: 0,
            maxZoom: 18,
            zoom: 3,
            zoomControl: true,
            attributionControl: false,
            layers: [osmLayer]
        }
    );

    createGroupedControl(map);
}


function createGroupedControl(map) {
  var boundariesStyle = {
      "color": "#ff7800",
      "weight": 1,
      "opacity": 1
   };

  var counry = L.topoJson(false, {
          style: boundariesStyle
      });

  var federals = L.topoJson(false, {
          style: boundariesStyle
      });

  var regions = L.topoJson(false, {
          style: boundariesStyle
      });


  var groupedOverlays = {
    "Boundaries": {
      "Country": counry,
      "Federals": federals,
      "Regions": regions
    }
  };

  var options = {
    exclusiveGroups: ["Boundaries"]
  };

  L.control.groupedLayers(null, groupedOverlays, options).addTo(map);

  map.on('overlayadd', overlayAdd);
}


function overlayAdd(event) {
  fetchResource(event.name, event.layer);
}

function fetchResource(name, layer) {
	//var resource = getStaticRecource(name);

  return getStaticRecource(name)
    .then(function(data) {
      console.log('Data recieved');
      layer.clearLayers();
      layer.addData(data);
      console.log('Data RENDERED');
    })
    .catch(function(error) { console.log(error); });
}