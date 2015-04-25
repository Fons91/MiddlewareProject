//layout characteristcs of the svg
var margin = {top: 50, right: 20, bottom: 20, left: 100},
width = 1200 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

function setupVideoDownloadSVG(){
  var parseDate = d3.time.format("%d/%b/%Y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(line) { console.log("date "+line.split(",")[0]);  return x(parseDate(line.split(",")[0])); })
      .y(function(line) { console.log("views "+line.split(",")[2]);return y( line.split(",")[2]); });

  var svg = d3.select("#viewsvg4").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  $.ajax({
        url:"/videovanilla",
        type: 'get',
        success: function(result,status){
           console.log(result);

          x.domain(d3.extent(result, function(line) {return parseDate(line.split(",")[0]); }));
          y.domain([0,d3.max(result, function(line) {  return +line.split(",")[2]; }) ]);

         svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Views");

        svg.append("path")
          .datum(result)
          .attr("class", "line")
          .attr("d", line);


        },
        error: function(result,status){

          console.log(result);
          console.log(status)
        }

      });

}

function setupVideoRemixSVG(){
  var parseDate = d3.time.format("%d/%b/%Y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(line) { console.log("date "+line.split(",")[0]);  return x(parseDate(line.split(",")[0])); })
      .y(function(line) { console.log("views "+line.split(",")[2]);return y( line.split(",")[2]); });

  var svg = d3.select("#viewsvg5").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  $.ajax({
        url:"/videoremix",
        type: 'get',
        success: function(result,status){
           console.log(result);

          x.domain(d3.extent(result, function(line) {return parseDate(line.split(",")[0]); }));
          y.domain([0,d3.max(result, function(line) {  return +line.split(",")[2]; }) ]);

         svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Views");

        svg.append("path")
          .datum(result)
          .attr("class", "line")
          .attr("d", line);


        },
        error: function(result,status){

          console.log(result);
          console.log(status)
        }

      });

}

$( document ).ready(function() {
    setupVideoDownloadSVG();
    setupVideoRemixSVG();

});
