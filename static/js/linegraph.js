


d3.csv("static/data/Yearly_Totals.csv", function(error, data) {

    console.log(data)
    var array = Object.entries(data) 


    console.log(array[0][1])

    var x_list = []
    var y_list = []
    var trace_list = []
    latest_city = array[0][1]['City']
    

    for (var i = 0; i < array.length; i++) {



        
        current_city = array[i][1]['City']

        if (current_city != latest_city) {
        
            var trace = {
                x: x_list,
                
                y: y_list,
                name: latest_city,
                type: 'scatter'

              };

              trace_list.push(trace)
        

              var x_list = []
              var y_list = []
              var trace = {}
        }

        latest_city = array[i][1]['City']



        x_val = parseInt(array[i][1]['Year'])
        y_val = array[i][1]['Total Murders']
      

        if (y_val > 0) {
        x_list.push(x_val)
        y_list.push(y_val)
  

        }

    frames = []

    
      
      
    }
      Plotly.newPlot('line-plot', trace_list, {title: {text: 'Number of Murders Over Time'}, xaxis: {
        title: 'Year'

    },
    yaxis: {
        title: 'Number of Murders'

    }},);


})