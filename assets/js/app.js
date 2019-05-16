// @TODO: YOUR CODE HERE!
(async function() {

  //Set up the layout
  const
      svgWidth = 960,
      svgHeight = 500;

  const margin = {
      top: 20,
      right: 40,
      bottom: 60,
      left: 60
  };

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
  const svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  const chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

  //Import Data
  const riskFactors = await d3.csv("assets/data/data.csv");
  console.log(riskFactors);

  //Cast data as floats
  riskFactors.forEach(function(data){

    data.age = parseFloat(data.age)
    data.ageMoe = parseFloat(data.ageMoe)
    data.healthcare = parseFloat(data.healthcare)
    data.healthcareHigh = parseFloat(data.healthcareHigh)
    data.healthcareLow = parseFloat(data.healthcareLow)
    data.id = parseFloat(data.id)
    data.income = +data.income
    data.incomeMoe = +data.incomeMoe
    data.obesity = parseFloat(data.obesity)
    data.obesityHigh = parseFloat(data.obesityHigh)
    data.obesityLow = parseFloat(data.obesityLow)
    data.poverty = parseFloat(data.poverty)
    data.povertyMoe = parseFloat(data.povertyMoe)
    data.smokes = parseFloat(data.smokes)
    data.smokesHigh = parseFloat(data.smokesHigh)
    data.smokesLow = parseFloat(data.smokesLow)

  });

  console.log(`In Poverty: ${riskFactors[0].poverty}`);
  
  //Create Scale Functions
  //X Axis Scale
  let xScale = d3.scaleLinear()
    .domain(d3.extent(riskFactors, d => d.poverty * 0.95)) 
    .range([0, width])

  //Y Axis Scale
  let yScale = d3.scaleLinear()
    .domain(d3.extent(riskFactors, d => d.obesity *0.93))
    .range([height, 0])

  console.log(`50 returns ${xScale(50)}`)
  console.log(`50 returns ${yScale(50)}`)

  //Create the Axes Functions
  let xAxis = d3.axisBottom(xScale)
  let yAxis = d3.axisLeft(yScale)

  //Append the axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)

  chartGroup.append("g")
    .call(yAxis)

  //Tool Tips are helpful
  const toolTip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-10, 0])
  .html(function(d) { return `In Poverty: ${d.poverty}<br>Obesity %: ${d.obesity}`; })
        
    chartGroup.call(toolTip)

  //Create circle elements 
    chartGroup.selectAll("circle")
      .data(riskFactors)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.obesity))
      .attr("r", 15)
      .attr("class", "stateCircle")
      .attr("opacity", ".5")
      .on("mouseover", toolTip.show)
      .on("mouseout", toolTip.hide)

  //The text on top of each circle
  chartGroup.selectAll(".stateText")
      .data(riskFactors)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.poverty))
      .attr("y", d => yScale(d.obesity) + 5)
      .attr("class", "stateText")
      .text(d => d.abbr)
      

  //Labels so we know what we're looking at
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))
    .attr("class", "aText")
    .text("Average Obesity Rate")

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "aText")
    .text("Average Poverty Rate")

})()
