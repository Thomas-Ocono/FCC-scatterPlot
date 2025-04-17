let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let req = new XMLHttpRequest();

let data;
let height = 500;
let width = 1000;
let padding = 50;

const main = (data) => {
  d3.select("body")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("background-color", "white")
    .style("display", "block")
    .style("margin", "auto");

  console.log();
};

//to get the data, then runs main function
req.open("GET", url, true);
req.onload = () => {
  data = JSON.parse(req.responseText);

  main(data);
};
req.send();
