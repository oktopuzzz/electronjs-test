L.TopoJSON = L.GeoJSON.extend({
  addData: function (data) {
    let geojson, key;
    if (data.type === "Topology") {
      for (key in data.objects) {
        if (data.objects.hasOwnProperty(key)) {

          console.log('Topojson operarion...');
          var start = new Date().getTime();
          
          geojson = topojson.feature(data, data.objects[key]);

          var end = new Date().getTime();
          var time = end - start;
          console.log('Execution time: ' + time);

          L.GeoJSON.prototype.addData.call(this, geojson);
        }
      }
      
      return this;
    }
    
    L.GeoJSON.prototype.addData.call(this, data);
    
    return this;
  }
});

L.topoJson = function (data, options) {
  return new L.TopoJSON(data, options);
};