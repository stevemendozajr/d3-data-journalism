// D3 Homework D3 Times
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function(dataFile) {
    
   

  // Parse Data/Cast as numbers
  dataFile.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });



  // Create scale functions
  var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(dataFile, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([2, d3.max(dataFile, d => d.healthcare)])
    .range([height, 0]);

  // Create axis functions
  // ==============================
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

   // Create Circles
  chartGroup.selectAll("circle")
  .data(dataFile)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "15")
  .attr("fill", "lightblue")
  .attr("opacity", ".5");

  // Create text labels for bubbles
  chartGroup.append("text")
  .style("text-anchor", "middle")
  .style("font-size", "12px")
  .style("fill", "white")
  .selectAll("tspan")
  .data(dataFile)
  .enter()
  .append("tspan")
      .attr("x", function(data) {
          return xLinearScale(data.poverty - 0);
      })
      .attr("y", function(data) {
          return yLinearScale(data.healthcare - 0.25);
      })
      .text(function(data) {
          return data.abbr  
      });

  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty(%)");
});


