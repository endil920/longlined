var svg = d3.select(".dazzle")
.append("svg")
.attr("width", 300)
.attr("height", 300)
.append("g");

function update(data) {
  console.log(data);
  var text = svg.selectAll("text")
 		.data(data, function(d) {return d;});

  text.attr("class", "update")
	.transition()
	.duration(500)
	.attr("x", function(d, i) {return i * 32});

  text.enter().append("text")
  .attr("class", "enter")
  .attr("dy", ".35em")
  .attr("y", -50)
  .attr("x", function(d, i) {return i * 32})
  .style("fill-opacity", 1e-5)
  .text(function(d) {return d.text;})
  .transition()
  .attr("y", 50)
  .style("fill-opacity", 1)
  .duration(500);

  text.exit()
  .attr("class", "exit")
  .transition()
  .duration(500)
  .remove();
}
update(["longlined"]);
$(".dazzle").click(function(){
  d3.select(".dazzle")
  .data(["dilloneng"])
  .transition();
}); 
