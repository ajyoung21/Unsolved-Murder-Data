

Plotly.d3.csv("static/data/Yearly_Totals.csv", function(err, data){

//   function unpack(rows, key) {
//   return rows.map(function(row) { return row[key]; });
// }



var array = Object.entries(data)

function update_plot() {
var x_list = []
var y_list = []

console.log('its running')


current_city = d3.select("#city_selection").node().value
current_factor = d3.select("#factor_selection").node().value

if (current_city == null) {
    current_city = 'Albuquerque'
    current_factor = 'Unsolved Murder %'
}



  for (var i = 0; i < array.length; i++) {
      if (array[i][1]['City'] == current_city) {
        x_val = array[i][1]['Year']
        y_val= array[i][1][current_factor]

        if (y_val > 0){

        x_list.push(x_val)
        y_list.push(y_val)
    }

      }

  }

  if (current_factor != 'Total Murders' && current_factor != 'Unsolved Murders'){
   {
      factor_max = 1
    }
  }
  else if (current_city == 'Chicago') {
      factor_max = 900
  }
  else{
      factor_max = Math.max(...y_list) + 30
  }

  var frames = []
  var x = x_list
  var y = y_list

  console.log(x_list)
  console.log(y_list)

  var n = 100;
  for (var i = 0; i < n; i++) { 
    frames[i] = {data: [{x: [], y: []}]}
    frames[i].data[0].x = x.slice(0, i+1);
    frames[i].data[0].y = y.slice(0, i+1);
  }

  Plotly.newPlot('animated', [{
    x: frames[1].data[0].x,
    y: frames[1].data[0].y,
    fill: 'tozeroy',
    type: 'scatter',
    mode: 'lines',
    line: {color: 'rgb(12, 86, 94)'}
  }], {title:{text: 'How Each City Has Changed Over Time'},
    xaxis: {
        title: 'Year',
      type: 'date', 
      range: [
        '2007', '2017'
      ],
      showgrid: false,
      showline: true,
      showticklabels: true,
      zeroline: false
    },
    yaxis: {
    title: current_factor,
      range: [
        0, 
        factor_max
      ],
      showgrid: false,
      showline: true,
      showticklabels: true,
      zeroline: false
    },
    annotations: [{
      showarrow: false,
      text: current_city,
      font: {
        family: 'Gravitas One',
        size:   34,
        color: 'Black'
      },
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: 0.9
    }, {
      showarrow: false,
      text: current_factor,
      font: {
        family: 'Gravitas One',
        size:   16,
        color: 'Black'
      },
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: 0.7
    }]
  }).then(function() {
    Plotly.animate('animated', frames, {
      transition: {
        duration: 0
      },
      frame: {
        duration: 60,
        redraw: false
      }
  });
  });
}
update_plot()

// Set up event listeners

window.onload=function(){
    var mb = document.getElementById("submit");
    mb.addEventListener("click", update_plot);
  
}



})