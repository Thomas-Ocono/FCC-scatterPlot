let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();

let data;
let height = 500;
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

  let timeArray = data.map((d) => d.Time);
  let yearsArray = data.map((d) => d.Year);

  const toSeconds = (time) => {
    const [min, sec] = time.split(":");
    return parseInt(min) * 60 + parseInt(sec);
  };
  let secondsArray = timeArray.map((d) => toSeconds(d));

  let xScale = d3
    .scaleLinear()
    .domain([d3.min(yearsArray), d3.max(yearsArray)])
    .range([padding, width - padding]);
  let yScale = d3
    .scaleLinear()
    .domain([d3.min(secondsArray), d3.min(secondsArray)])
    .range([height - padding, padding]);

  let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  let yAxis = d3.axisLeft(yScale).tickFormat(d3.format("d"));

  svg
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0, " + (height - padding) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("transform", "translate(" + padding + ", 0)");
};

//to get the data, then runs main function
req.open("GET", url, true);
req.onload = () => {
  data = JSON.parse(req.responseText);

  main(data);
};
req.send();
