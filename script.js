let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();

let data;
let height = 750;
let width = 1000;
let padding = 50;

const main = (data) => {
  const svg = d3
    .select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("background-color", "white")
    .style("display", "block")
    .style("margin", "auto");

  let yearsArray = data.map((d) => d.Year);

  //creating x scale and axis
  let xScale = d3
    .scaleLinear()
    .domain([d3.min(yearsArray) - 1, d3.max(yearsArray)])
    .range([padding, width - padding]);

  let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

  svg
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0, " + (height - padding) + ")")
    .attr("id", "x-axis");

  //creating y scale and axis
  //get times from data, then convert them into date objects
  const timesArray = data.map((d) => d.Time);
  const parseTime = d3.timeParse("%M:%S");
  const parsedArray = timesArray.map((d) => parseTime(d));

  let yScale = d3
    .scaleTime()
    .domain([d3.max(parsedArray), d3.min(parsedArray)])
    .range([height - padding, padding]);
  let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  svg
    .append("g")
    .call(yAxis)
    .attr("transform", "translate(" + padding + ", 0)")
    .attr("id", "y-axis");

  //making the circles on the graph
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d) => parseTime(d.Time))
    .attr("r", 7)
    .attr("cx", (d) => xScale(d.Year))
    .attr("cy", (d) => yScale(parseTime(d.Time)))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", function (d) {
      if (d.Doping == "") {
        return "green";
      } else {
        return "red";
      }
    });
  // creating the legend
  const legend = svg
    .append("g")
    .attr("id", "legend")
    .attr("transform", "translate(800,200)");
  legend.append("g").append("text").text("Drug Use Allegations: ");
  legend
    .append("circle")
    .attr("r", 7)
    .attr("transform", "translate(160, -3.5)")
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("stroke-width", 1);
  legend
    .append("g")
    .append("text")
    .text("No Drug Use Allegations: ")
    .attr("transform", "translate(-23, 20)");
  legend
    .append("circle")
    .attr("r", 7)
    .attr("transform", "translate(161, 16.5)")
    .attr("fill", "green")
    .attr("stroke", "black")
    .attr("stroke-width", 1);
};

//to get the data, then runs main function
req.open("GET", url, true);
req.onload = () => {
  data = JSON.parse(req.responseText);

  main(data);
};
req.send();
