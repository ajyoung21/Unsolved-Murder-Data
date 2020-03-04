var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  Overall: new L.LayerGroup(),
  Asian: new L.LayerGroup(),
  Black: new L.LayerGroup(),
  Hispanic: new L.LayerGroup(),
  White: new L.LayerGroup(),
  Other: new L.LayerGroup(),
  Unknown: new L.LayerGroup()
};



// Create the map with our layers
var map = L.map("map-id", {
  center: [40.73, -95.0059],
  zoom: 4,
  layers: [
    layers.Overall,
    // layers.Asian,
    // layers.Black,
    // layers.Hispanic,
    // layers.White,
    // layers.Other,
    // layers.Unknown,
  ]
});

// Add our 'darkmap' tile layer to the map
darkmap.addTo(map);


var markersLayer = new L.LayerGroup()
markersLayer.addTo(map)
// Create an overlays object to add to the layer control
var overlays = {
  "Overall": layers.Overall,
  "Asian": layers.Asian,
  "Black": layers.Black,
  "Hispanic": layers.Hispanic,
  "White": layers.White,
  "Other": layers.Other,
  "Unknown": layers.Unknown
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);








  // Read in information on countries
d3.json("static/data/Data_Totals.json", function(error, data) {
    // Clear out all existing markers on the map
    // markersLayer.clearLayers()
    
    var array = Object.entries(data)



    // Loop through each island and create markers
    for (var i = 0; i < 50; i++) {
      // Get country information
      var city_name = array[0][1][i]
      var city_total_murders = array[1][1][i]
      var city_total_unsolved_murders = array[2][1][i]
      var city_total_unsolved_murders_percent = array[3][1][i]
      var city_total_asian_percent = array[4][1][i]
      var city_unsolved_asian_percent = array[5][1][i]
      var city_total_black_percent = array[6][1][i]
      var city_unsolved_black_percent = array[7][1][i]
      var city_total_hispanic_percent = array[8][1][i]
      var city_unsolved_hispanic_percent = array[9][1][i]
      var city_total_white_percent = array[10][1][i]
      var city_unsolved_white_percent = array[11][1][i]
      var city_total_other_percent = array[12][1][i]
      var city_unsolved_other_percent = array[13][1][i]
      var city_total_unknown_percent = array[14][1][i]
      var city_unsolved_unknown_percent = array[15][1][i]
      var city_lat = array[16][1][i]
      var city_lon = array[17][1][i]
  


      // // Get the lat and lon
      var lat_lon = []
      lat_lon.push(city_lat)
      lat_lon.push(city_lon)

      var colorone = "lightgreen"
      var colortwo = "green"
      var colorthree = "#ffe000"
      var colorfour = "#eb6800"
      var colorfive = "#ff4e00"
      var colorsix = "#c80000"
      
      // Apply color formatting based on host countries corruptness
      if (city_total_unsolved_murders_percent >=.70) {
        tickcolor = colorsix;
        fillcolor = colorsix
      }
      else if (city_total_unsolved_murders_percent >=.60) {
        tickcolor = colorfive;
        fillcolor = colorfive
      }
      else if (city_total_unsolved_murders_percent >=.50 ) {
        tickcolor = colorfour;
        fillcolor = colorfour
      }
      else if (city_total_unsolved_murders_percent >=.40 ) {
        tickcolor = colorthree;
        fillcolor = colorthree;
      }
      else if (city_total_unsolved_murders_percent >=.30 ) {
        tickcolor = colortwo;
        fillcolor = colortwo
      }
    
      else if (city_total_unsolved_murders_percent >=.20 ) {
      tickcolor = colorone;
      fillcolor = colorone
    }
    

   
      
      fillOpacity = 0.5
      
      
      
      // Throw those markers on the map
      var marker = L.circleMarker(lat_lon, {radius: Math.sqrt(city_total_murders)/3, color: tickcolor, fillColor: fillcolor, fillOpacity: fillOpacity}).bindPopup("<h4>" + 
      city_name + "</h4><hr><h5>Total Murders: " + city_total_murders + "</h5><h5>% Murders Unsolved: " + 
      Math.round(100*city_total_unsolved_murders_percent) + "%" + "</h5><hr><h5><strong>Racial Makeup of Murder Victims:</strong>"
      +"</h5><hr><h5>% Asian: " + Math.round(100*city_total_asian_percent) + "%"
      + "</h5><hr><h5>% Black: " + Math.round(100*city_total_black_percent) + "%"
      + "</h5><hr><h5>% Hispanic: " + Math.round(100*city_total_hispanic_percent) + "%"
      + "</h5><hr><h5>% White: " + Math.round(100*city_total_white_percent) + "%"
      + "</h5><hr><h5>% Other: " + Math.round(100*city_total_other_percent) + "%"
      + "</h5><hr><h5>% Unknown: " + Math.round(100*city_total_unknown_percent) + "%"
      +"</h5><hr><h5>Percentage of Unsolved Murders by Race:"
      +"</h5><hr><h5>% Asian Murders Unsolved: " + Math.round(100*city_unsolved_asian_percent) + "%"
      + "</h5><hr><h5>% Black Murders Unsolved: " + Math.round(100*city_unsolved_black_percent) + "%"
      + "</h5><hr><h5>% Hispanic Murders Unsolved: " + Math.round(100*city_unsolved_hispanic_percent) + "%"
      + "</h5><hr><h5>% White Murders Unsolved: " + Math.round(100*city_unsolved_white_percent) + "%"
      + "</h5><hr><h5>% Other Race Murders Unsolved: " + Math.round(100*city_unsolved_other_percent) + "%"
      + "</h5><hr><h5>% Unknown Race Murders Unsolved: " + Math.round(100*city_unsolved_unknown_percent) + "%"
      + "</h5>")
      layers.Overall.addLayer(marker)

      if (city_unsolved_asian_percent - city_total_unsolved_murders_percent < -.15) {
        tickcolor = colorone;
        fillcolor = colorone
      }
      else if (city_unsolved_asian_percent - city_total_unsolved_murders_percent < -.075) {
        tickcolor = colortwo;
        fillcolor = colortwo
      }
      else if ((city_unsolved_asian_percent - city_total_unsolved_murders_percent < 0)) {
        tickcolor = colorthree;
        fillcolor = colorthree
      }
      else if ((city_unsolved_asian_percent - city_total_unsolved_murders_percent < .075)) {
        tickcolor = colorfour;
        fillcolor = colorfour;
      }
      else if ((city_unsolved_asian_percent - city_total_unsolved_murders_percent < .15)) {
        tickcolor = colorfive;
        fillcolor = colorfive
      }
    
      else {
      tickcolor = colorsix;
      fillcolor = colorsix
    }

      var marker2 = L.circleMarker(lat_lon, {radius: Math.sqrt(city_total_asian_percent*city_total_murders) + 3, color: tickcolor, 
        fillColor: fillcolor, fillOpacity: fillOpacity}).bindPopup(



          city_name + "</br>" +
          "</h5><hr><h5>Total Asian Murders: " + Math.round(city_total_asian_percent*city_total_murders) + "</br>" +
          "</h5><hr><h5>% Murders With Asian Victims: " + Math.round(100*city_total_asian_percent) + "%</br>"
          + "</h5><h5>% Murders Unsolved: " + 
          Math.round(100*city_total_unsolved_murders_percent) + "%" +
          "</h5><hr><h5>% Asian Murders Unsolved: " + Math.round(100*city_unsolved_asian_percent) + "%"

        )

    layers.Asian.addLayer(marker2)


    if (city_unsolved_black_percent - city_total_unsolved_murders_percent < -.15) {
      tickcolor = colorone;
      fillcolor = colorone
    }
    else if (city_unsolved_black_percent - city_total_unsolved_murders_percent < -.075) {
      tickcolor = colortwo;
      fillcolor = colortwo
    }
    else if ((city_unsolved_black_percent - city_total_unsolved_murders_percent < 0)) {
      tickcolor = colorthree;
      fillcolor = colorthree
    }
    else if ((city_unsolved_black_percent - city_total_unsolved_murders_percent < .075)) {
      tickcolor = colorfour;
      fillcolor = colorfour;
    }
    else if ((city_unsolved_black_percent - city_total_unsolved_murders_percent < .15)) {
      tickcolor = colorfive;
      fillcolor = colorfive
    }
  
    else {
    tickcolor = colorsix;
    fillcolor = colorsix
  }

    var marker3 = L.circleMarker(lat_lon, {radius: Math.sqrt(city_total_black_percent*city_total_murders) + 3, color: tickcolor, 
      fillColor: fillcolor, fillOpacity: fillOpacity}).bindPopup(

        city_name + "</br>" +
        "</h5><hr><h5>Total Black Murders: " + Math.round(city_total_black_percent*city_total_murders) + "</br>" +
        "</h5><hr><h5>% Murders With Black Victims: " + Math.round(100*city_total_black_percent) + "%</br>"
        + "</h5><h5>% Murders Unsolved: " + 
        Math.round(100*city_total_unsolved_murders_percent) + "%" +
        "</h5><hr><h5>% Black Murders Unsolved: " + Math.round(100*city_unsolved_black_percent) + "%"

      )

  layers.Black.addLayer(marker3)



  if (city_unsolved_hispanic_percent - city_total_unsolved_murders_percent < -.15) {
    tickcolor = colorone;
    fillcolor = colorone
  }
  else if (city_unsolved_hispanic_percent - city_total_unsolved_murders_percent < -.075) {
    tickcolor = colortwo;
    fillcolor = colortwo
  }
  else if ((city_unsolved_hispanic_percent - city_total_unsolved_murders_percent < 0)) {
    tickcolor = colorthree;
    fillcolor = colorthree
  }
  else if ((city_unsolved_hispanic_percent - city_total_unsolved_murders_percent < .075)) {
    tickcolor = colorfour;
    fillcolor = colorfour;
  }
  else if ((city_unsolved_hispanic_percent - city_total_unsolved_murders_percent < .15)) {
    tickcolor = colorfive;
    fillcolor = colorfive
  }

  else {
  tickcolor = colorsix;
  fillcolor = colorsix
}

  var marker4 = L.circleMarker(lat_lon, {radius: Math.sqrt(city_total_hispanic_percent*city_total_murders) + 3, color: tickcolor, 
    fillColor: fillcolor, fillOpacity: fillOpacity}).bindPopup(

      city_name + "</br>" +
      "</h5><hr><h5>Total Hispanic Murders: " + Math.round(city_total_hispanic_percent*city_total_murders) + "</br>" +
      "</h5><hr><h5>% Murders With Hispanic Victims: " + Math.round(100*city_total_hispanic_percent) + "%</br>"
      + "</h5><h5>% Murders Unsolved: " + 
      Math.round(100*city_total_unsolved_murders_percent) + "%" +
      "</h5><hr><h5>% Hispanic Murders Unsolved: " + Math.round(100*city_unsolved_hispanic_percent) + "%"

    )

layers.Hispanic.addLayer(marker4)



if (city_unsolved_white_percent - city_total_unsolved_murders_percent < -.15) {
  tickcolor = colorone;
  fillcolor = colorone
}
else if (city_unsolved_white_percent - city_total_unsolved_murders_percent < -.075) {
  tickcolor = colortwo;
  fillcolor = colortwo
}
else if ((city_unsolved_white_percent - city_total_unsolved_murders_percent < 0)) {
  tickcolor = colorthree;
  fillcolor = colorthree
}
else if ((city_unsolved_white_percent - city_total_unsolved_murders_percent < .075)) {
  tickcolor = colorfour;
  fillcolor = colorfour;
}
else if ((city_unsolved_white_percent - city_total_unsolved_murders_percent < .15)) {
  tickcolor = colorfive;
  fillcolor = colorfive
}

else {
tickcolor = colorsix;
fillcolor = colorsix
}

var marker5 = L.circleMarker(lat_lon, {radius: Math.sqrt(city_total_white_percent*city_total_murders) + 3, color: tickcolor, 
  fillColor: fillcolor, fillOpacity: fillOpacity}).bindPopup(

    city_name + "</br>" +
    "</h5><hr><h5>Total White Murders: " + Math.round(city_total_white_percent*city_total_murders) + "</br>" +
    "</h5><hr><h5>% Murders With White Victims: " + Math.round(100*city_total_white_percent) + "%</br>"
    + "</h5><h5>% Murders Unsolved: " + 
    Math.round(100*city_total_unsolved_murders_percent) + "%" +
    "</h5><hr><h5>% White Murders Unsolved: " + Math.round(100*city_unsolved_white_percent) + "%"

  )

layers.White.addLayer(marker5)




if (city_unsolved_other_percent - city_total_unsolved_murders_percent < -.15) {
  tickcolor = colorone;
  fillcolor = colorone
}
else if (city_unsolved_other_percent - city_total_unsolved_murders_percent < -.075) {
  tickcolor = colortwo;
  fillcolor = colortwo
}
else if ((city_unsolved_other_percent - city_total_unsolved_murders_percent < 0)) {
  tickcolor = colorthree;
  fillcolor = colorthree
}
else if ((city_unsolved_other_percent - city_total_unsolved_murders_percent < .075)) {
  tickcolor = colorfour;
  fillcolor = colorfour;
}
else if ((city_unsolved_other_percent - city_total_unsolved_murders_percent < .15)) {
  tickcolor = colorfive;
  fillcolor = colorfive
}

else {
tickcolor = colorsix;
fillcolor = colorsix
}

var marker6 = L.circleMarker(lat_lon, {radius: Math.sqrt(city_total_other_percent*city_total_murders) + 3, color: tickcolor, 
  fillColor: fillcolor, fillOpacity: fillOpacity}).bindPopup(

    city_name + "</br>" +
    "</h5><hr><h5>Total 'Other' Murders: " + Math.round(city_total_other_percent*city_total_murders) + "</br>" +
    "</h5><hr><h5>% Murders With 'Other' Victims: " + Math.round(100*city_total_other_percent) + "%</br>"
    + "</h5><h5>% Murders Unsolved: " + 
    Math.round(100*city_total_unsolved_murders_percent) + "%" +
    "</h5><hr><h5>% 'Other' Murders Unsolved: " + Math.round(100*city_unsolved_other_percent) + "%"

  )

layers.Other.addLayer(marker6)





if (city_unsolved_unknown_percent - city_total_unsolved_murders_percent < -.15) {
  tickcolor = colorone;
  fillcolor = colorone
}
else if (city_unsolved_unknown_percent - city_total_unsolved_murders_percent < -.075) {
  tickcolor = colortwo;
  fillcolor = colortwo
}
else if ((city_unsolved_unknown_percent - city_total_unsolved_murders_percent < 0)) {
  tickcolor = colorthree;
  fillcolor = colorthree
}
else if ((city_unsolved_unknown_percent - city_total_unsolved_murders_percent < .075)) {
  tickcolor = colorfour;
  fillcolor = colorfour;
}
else if ((city_unsolved_unknown_percent - city_total_unsolved_murders_percent < .15)) {
  tickcolor = colorfive;
  fillcolor = colorfive
}

else {
tickcolor = colorsix;
fillcolor = colorsix
}

var marker7 = L.circleMarker(lat_lon, {radius: Math.sqrt(city_total_unknown_percent*city_total_murders) + 3, color: tickcolor, 
  fillColor: fillcolor, fillOpacity: fillOpacity}).bindPopup(

    city_name + "</br>" +
    "</h5><hr><h5>Total 'Unknown' Murders: " + Math.round(city_total_unknown_percent*city_total_murders) + "</br>" +
    "</h5><hr><h5>% Murders With 'Unknown' Victims: " + Math.round(100*city_total_unknown_percent) + "%</br>"
    + "</h5><h5>% Murders Unsolved: " + 
    Math.round(100*city_total_unsolved_murders_percent) + "%" +
    "</h5><hr><h5>% 'Unknown' Murders Unsolved: " + Math.round(100*city_unsolved_unknown_percent) + "%"

  )

layers.Unknown.addLayer(marker7)
   
  
    }


var legend1 = L.control({position: 'bottomright'});
var legend2 = L.control({position: 'bottomright'});

legend1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML =
    "<center>Overall Legend</br></center>" +
    "Larger Bubbles = More Homicides</br>" +
    "</br>" + 
    `<30% Unsolved Murders <i style='background: ${colorone}'></i>` + "</br>" +
    `30-40% Unsolved Murders<i style='background: ${colortwo}'></i>`  + "</br>"+
    `40-50% Unsolved: Murders<i style='background: ${colorthree}'></i>` +  "</br>"+
    `50-60% Unsolved: Murders<i style='background: ${colorfour}'></i>` +  "</br>"+
    `60-70% Unsolved: Murders<i style='background: ${colorfive}'></i>` +  "</br>"+
    `>70% Unsolved: Murders<i style='background: ${colorsix}'></i>` +  "</br>";
return div;
};

legend2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML =
      "<center>Individual Race Legend</br>" +
      "Larger Bubbles = More Homicides</center>"+
      "</br>"+
      `>15% Below the Average Unsolved Rate<i style='background: ${colorone}'></i>` + "</br>" +
      `7.5-15% Below the Average Unsolved Rate<i style='background: ${colortwo}'></i>`  + "</br>"+
      `0-7.5% Below the Average Unsolved Rate<i style='background: ${colorthree}'></i>` +  "</br>"+
      `0-7.5%% Above the Average Unsolved Rate<i style='background: ${colorfour}'></i>` +  "</br>"+
      `7.5-15%% Above the Average Unsolved Rate<i style='background: ${colorfive}'></i>` +  "</br>"+
      `>15%% Above the Average Unsolved Rate<i style='background: ${colorsix}'></i>` +  "</br>";
return div;
};

// Add this one (only) for now, as the Population layer is on by default
legend1.addTo(map);
console.log(legend1)
console.log(legend2)

map.on('overlayadd', function (eventLayer) {
    // Switch to the Population legend...
    if (eventLayer.name === 'Overall') {
        this.removeControl(legend2);
        legend1.addTo(this);
    } else { // Or switch to the Population Change legend...
        this.removeControl(legend1);
        legend2.addTo(this);
    }
  })

    
  })
