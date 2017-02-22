d3.json('data/data.json', function (error,data) {

  function tabulate(data, columns) {
		var table = d3.select('#dataTable').append('table')
		var thead = table.append('thead')
		var	tbody = table.append('tbody');

		// append the header row
		thead.append('tr')
		  .selectAll('th')
		  .data(columns).enter()
		  .append('th')
		    .text(function (column) { 
			column = column.toUpperCase();
			return column; });

		// create a row for each object in the data
		var rows = tbody.selectAll('tr')
		  .data(data)
		  .enter()
		  .append('tr');

		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		  .data(function (row) {
		    return columns.map(function (column) {
				var a = row[column];
				if(a != undefined || a!= null){
					a = a.substring(0,19);
					console.log(a);
				}
		      return {column: column, value: a};
		    });
		  })
		  .enter()
		  .append('td')
		    .text(function (d) { return d.value; });

	  return table;
	}

	// render the table(s)
	tabulate(data, ['flight', 'sourceCity','destinationCity','account','schedDepDate','flightStatus','schedDepTime','totalDelay','delayCode','etDateTime','luDateTime']); // 2 column table
	
	
	function InitChart() {
                    var data = [{
                        "time": "2.5",
                        "flight_number": "2000"
                    }, {
                        "time": "3.4",
                        "flight_number": "2002"
                    }, {
                        "time": "5",
                        "flight_number": "2004"
                    }, {
                        "time": "8",
                        "flight_number": "2006"
                    }, {
                        "time": "4",
                        "flight_number": "2008"
                    }, {
                        "time": "1.7",
                        "flight_number": "2010"
                    }];
                    var data2 = [{
                        "time": "3",
                        "flight_number": "2000"
                    }, {
                        "time": "3.4",
                        "flight_number": "2002"
                    }, {
                        "time": "7",
                        "flight_number": "2004"
                    }, {
                        "time": "8.2",
                        "flight_number": "2006"
                    }, {
                        "time": "4.5",
                        "flight_number": "2008"
                    }, {
                        "time": "5",
                        "flight_number": "2010"
                    }];
					
					var data3 = [{
                        "time": "1.2",
                        "flight_number": "2000"
                    }, {
                        "time": "2.6",
                        "flight_number": "2002"
                    }, {
                        "time": "6.2",
                        "flight_number": "2004"
                    }, {
                        "time": "2",
                        "flight_number": "2006"
                    }, {
                        "time": "8",
                        "flight_number": "2008"
                    }, {
                        "time": "4",
                        "flight_number": "2010"
                    }];
                    var vis = d3.select("#visualisation"),
                        WIDTH = 500,
                        HEIGHT = 250,
                        MARGINS = {
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 50
                        },
                        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000, 2010]),
                        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 24]),
                        xAxis = d3.svg.axis()
                        .scale(xScale),
                        yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");
                    vis.append("svg:g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                        .call(xAxis);
                    vis.append("svg:g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                        .call(yAxis);
                    var lineGen = d3.svg.line()
                        .x(function(d) {
                            return xScale(d.flight_number);
                        })
                        .y(function(d) {
                            return yScale(d.time);
                        })
                        .interpolate("basis");
                    vis.append('svg:path')
                        .attr('d', lineGen(data))
                        .attr('stroke', 'green')
			.attr("stroke-linejoin", "round")
                        .attr('stroke-width', 2)
                        .attr('fill', 'none');
                    vis.append('svg:path')
                        .attr('d', lineGen(data2))
                        .attr("stroke", "steelblue")
			.attr("stroke-linejoin", "round")
                        .attr('stroke-width', 2)
                        .attr('fill', 'none');
						
					/* vis.append('svg:path')
                        .attr('d', lineGen(data3))
                        .attr("stroke", "red")
			.attr("stroke-linejoin", "round")
                        .attr('stroke-width', 2)
                        .attr('fill', 'none'); */
                }
                InitChart();
				
				
			nv.addGraph(function() {
			  var chart = nv.models.pieChart()
				  .x(function(d) { return d.label })
				  .y(function(d) { return d.value })
				  .showLabels(true)     //Display pie labels
				  .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
				  .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
				  .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
				  .donutRatio(0.25)     //Configure how big you want the donut hole size to be.
				  ;
				  
			  chart.pie.startAngle(function(d) { return d.startAngle -Math.PI })
			  chart.pie.endAngle(function(d) { return d.endAngle -Math.PI });
			  chart.pie.donutLabelsOutside(true);
			  
			  d3.select("#chart2 svg")
				  .datum(exampleData1())
				  .transition().duration(350)
				  .call(chart);

			  return chart;
			});
			
			function exampleData1() {
			  //calculate cancel, delay, ontime
			 
			var cancel = 0, delay = 0, ontime = 0;
			
			console.log("..."+data[0].totalDelay + data.length);
			for(var i in data){
				var delay1 = data[i].totalDelay;
				if(delay1 > 0){
					delay = delay + 1;
				}
				else if(delay1 == 0 ){
					cancel = cancel + 1;	
				}else{
					ontime = ontime + 1;
					}
			}
			
			  return[
				  { 
					"label": "Cancel",
					"value" : 100
				  } , 
				  { 
					"label": "Delay",
					"value" : 74
				  } , 
				  { 
					"label": "Ontime",
					"value" : 1000
				  } 
				];
			}


});