d3.csv("data/measurements.csv", function(error, data) {
  
  // Parse string dates
  data = data.map(function(currentValue) {
    newValue = currentValue;
    // Convert, and adjust for 20min offset of the measuring device
    newValue.date = new Date((new Date(newValue.date)).getTime() - (20 * 60 * 1000));
    return newValue;
  });
  
  // Extract systolic values into separate array
  systolic_data = data.map(function(currentValue) {
    return {
      date: currentValue.date,
      value: currentValue.systolic
    }
  });
  
  // Extract diastolic values into separate array
  diastolic_data = data.map(function(currentValue) {
    return {
      date: currentValue.date,
      value: currentValue.diastolic
    }
  });
  
  // Extract heart rate
  heart_rate_data = data.map(function(currentValue) {
    return {
      date: currentValue.date,
      value: currentValue.heart_rate
    }
  });
  
  // recombine everything
  data = [systolic_data, diastolic_data, heart_rate_data];
  
  // Get the markers
  d3.csv("data/markers.csv", function(error, markers) {
    
    markers = markers.map(function(currentValue) {
      return {
        date: new Date(currentValue.date),
        label: currentValue.label
      }
    });
    
    MG.data_graphic({
      data: data,
      width: 1400,
      height: 500,
      right: 170,
      top: 250,
      target: "#graph",
      legend: ["Systolischer Blutdruck", "Diastolischer Blutdruck", "Puls"],
      markers: markers
    })
    
    var svg = d3.select("#graph").select("svg");
    svg
    .selectAll('text.mg-marker-text')
    .each(function(datum, index) {
      var d3element = d3.select(this)
      d3element.attr("font-family", "'Droid Sans', sans-serif");
      var x = d3element.attr("x");
      var y = d3element.attr("y");
      var dx = d3element.node().getBBox().width / 2
      d3element.attr("transform", "rotate(-45 " + x + "," + y + ")translate(" + dx + ",0)");
    });
  });
});