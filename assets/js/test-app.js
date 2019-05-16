(async function(){
    const
        svgWidth = 960,
        svgHeight = 500;

    const margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 100
    };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    const svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Import Data
    const hairData = await d3.csv("hairData.csv");
    console.log(hairData)
    console.log(hairData[0].hair_length)

    // Step 1: Parse Data/Cast as numbers
    // ==============================

    hairData.forEach(function(data) {
        data.hair_length = +data.hair_length
        data.num_hits = +data.num_hits
    });

    console.log(hairData)

    // Step 2: Create scale functions
    // ==============================

    //X Axis scale
    let x_axisScale = d3.scaleLinear()
        .domain([20, d3.max(hairData, d => d.hair_length)])
        .range([0, width])


    //Y axis scale
    let y_axisScale = d3.scaleLinear()
        .domain([0, d3.max(hairData, d => d.num_hits)])
        .range([height, 0])

    console.log(`50 returns ${x_axisScale(50)}`)
    console.log(`50 returns ${y_axisScale(50)}`)

    // Step 3: Create axis functions
    // ==============================
    let xAxis = d3.axisBottom(x_axisScale)
    let yAxis = d3.axisLeft(y_axisScale).ticks(9)

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

    chartGroup.append("g")
        .call(yAxis)

    // Step 5: Create Circles
    // ==============================
    chartGroup.selectAll("circle")
        .data(hairData)
        .enter()
        .append("circle")
        .attr("cx", d => x_axisScale(d.hair_length))
        .attr("cy", d => y_axisScale(d.num_hits))
        .attr("r", 15)
        .attr("fill", "pink")
        .attr("opacity", ".5");

    /*
    chartGroup.selectAll("rect")
        .data(rects)
        .enter().append("rect")
        .attr("x", function(d, i){ return i * size * 1.5 + (0.5 * size)})
        .attr("y", function(d, i){ return i % 2 ? 325 : 100; })
        .attr("height", size)
        .attr("width", size)
        .style("fill", img_url)
        .style("stroke", color)

    */


    // Step 6: Initialize tool tip
    // ==============================

    // Step 7: Create tooltip in the chart
    // ==============================


    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================


    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Number of Billboard 100 Hits");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Hair Metal Band Hair Length (inches)");
})()
