var w = 900,
    h = 800;

var circleWidth = 5;

var fontFamily = 'Bree Serif',
    fontSizeHighlight = '1.5em',
    fontSizeNormal = '1em';

var palette = {
    "lightgray": "#819090",
    "gray": "#708284",
    "mediumgray": "#536870",
    "darkgray": "#475B62",

    "darkblue": "#0A2933",
    "darkerblue": "#042029",

    "paleryellow": "#FCF4DC",
    "paleyellow": "#EAE3CB",
    "yellow": "#A57706",
    "orange": "#BD3613",
    "red": "#D11C24",
    "pink": "#C61C6F",
    "purple": "#595AB7",
    "blue": "#2176C7",
    "green": "#259286",
    "yellowgreen": "#738A05"
}

var nodes = [
    {"name": "Harry Potter", "weight": 10}, //0
    {"name": "Ron Weasley", "weight": 9}, //1
    {"name": "Hermione Granger", "weight": 9}, //2
    {"name": "Ginny Weasley", "weight": 5}, //3
    {"name": "Fred Weasley", "weight": 4, "deceased": true}, //4
    {"name":"George Weasley", "weight": 4}, //5
    {"name":"Bill Weasley", "weight": 1}, //6
    {"name":"Percy Weasley", "weight": 2}, //7
    {"name":"Cho Chang", "weight": 3}, //8
    {"name":"Charlie Weasley", "weight": 1}, //9
    {"name":"Fleur Delacour", "weight": 5}, //10
    {"name":"Audrey (maiden name unknown)", "weight": 0.5}
]

var hookups = [
    {source: nodes[0], target:nodes[8]},
    {source: nodes[0], target: nodes[3]},
    {source: nodes[2], target:nodes[1]},
    {source: nodes[10], target: nodes[6]},
    {source: nodes[11], target: nodes[7]}
]

var sibs = [
    {source: nodes[1], target:nodes[3]},
    {source: nodes[1], target:nodes[4]},
    {source: nodes[1], target:nodes[5]},
    {source: nodes[1], target:nodes[6]},
    {source: nodes[1], target:nodes[7]},
    {source: nodes[1], target:nodes[9]},
    {source: nodes[3], target:nodes[4]},
    {source: nodes[3], target:nodes[5]},
    {source: nodes[3], target:nodes[6]},
    {source: nodes[3], target:nodes[7]},
    {source: nodes[3], target:nodes[9]},
    {source: nodes[4], target:nodes[5]},
    {source: nodes[4], target:nodes[6]},
    {source: nodes[4], target:nodes[7]},
    {source: nodes[4], target:nodes[9]},
    {source: nodes[5], target:nodes[6]},
    {source: nodes[5], target:nodes[7]},
    {source: nodes[5], target:nodes[9]},
    {source: nodes[6], target:nodes[7]},
    {source: nodes[6], target:nodes[9]},
    {source: nodes[7], target:nodes[9]}
]

var vis = d3.select("body")
.append("svg:svg")
.attr("class", "stage")
.attr("width", w)
.attr("height", h);

var force = d3.layout.force()
.nodes(nodes)
.links([])
.gravity(0.2)
.charge(-1200)
.size([w, h]);

var link = vis.selectAll(".hooklink")
.data(hookups)
.enter().append("line")
.attr("class", "link")
.attr("stroke", palette.pink)
.attr("fill", "none");

var siblink = vis.selectAll(".siblink")
.data(sibs)
.enter()
.append("line")
.attr("class", "link")
.attr("stroke", "steelblue")
.attr("fill", "none");

var node = vis.selectAll("circle.node")
.data(nodes)
.enter().append("g")
.attr("class", "node")
.call(force.drag);


//CIRCLE
node.append("svg:circle")
.attr("cx", function(d) { return d.x; })
.attr("cy", function(d) { return d.y; })
.attr("r", function(d) {return d.weight / 10.0 * 30.0})
.attr("fill", function(d) {if (d.deceased) {
    return "white";
} else {
    return palette.darkgray;
}
                          })

//TEXT
node.append("text")
.text(function(d, i) { return d.name; })
.attr("x",    function(d, i) { return 15; })
.attr("y",            function(d, i) {return 8;})
.attr("font-family",  "Calibri")
.attr("fill", function(d) {if (d.deceased) {
    return "black";}
                                      else {
                                          return  "white";  }})
.attr("font-size",    function(d, i) {  return  "1em"; })



force.on("tick", function(e) {
    node.attr("transform", function(d, i) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    link.attr("x1", function(d)   { return d.source.x; })
    .attr("y1", function(d)   { return d.source.y; })
    .attr("x2", function(d)   { return d.target.x; })
    .attr("y2", function(d)   { return d.target.y; })

    siblink.attr("x1", function(d)   { return d.source.x; })
    .attr("y1", function(d)   { return d.source.y; })
    .attr("x2", function(d)   { return d.target.x; })
    .attr("y2", function(d)   { return d.target.y; })
});

force.start();
