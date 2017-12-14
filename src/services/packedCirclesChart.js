import * as d3 from "d3"
import {merge as _merge} from "lodash"

export class PackedCirclesChart {

  constructor(props) {
    this.props = props

    this.selections = {}
    this.elements = {}
    this.color = null

    this.init()
    this.update(props)
  }

  init() {
    const selector = this.props.selector
    const data = this.props.data
    const onFileClick = this.props.onFileClick

    const svg = d3.select(selector);
    const margin = 20;
    const diameter = +svg.attr("width"),
      g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

    this.color = d3.scaleLinear()
      .domain([-1, 10])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

    var pack = d3.pack()
      .size([diameter - margin, diameter - margin])
      .padding(2);

    const root = d3.hierarchy(data)
      .sum(function (d) { return d.size; })
      .sort(function (a, b) { return b.value - a.value; });

    var focus = root,
      nodes = pack(root).descendants(),
      view;

    this.selections.circles = g.selectAll("circle.node")
      .data(nodes)

    var circle = this.selections.circles
      .enter().append("circle")
      .attr("class", function (d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })

    this.selections.circles = circle.merge(this.selections.circles)

    this.selections.circles.on("click", (d, e) => {
      if (focus !== d) {
        if (typeof onFileClick === "function" && d.height === 0) {
          onFileClick(d.data);
        } else {
          zoom(d)
        }

        d3.event.stopPropagation();
      }
    })

    g.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
      .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
      .text(function (d) { return d.data.name; });

    var node = g.selectAll("circle,text");

    svg
      .style("background", this.color(-1))
      .on("click", function () { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
      console.log("ZOOM", d)
      focus = d;

      var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function (d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function (t) { zoomTo(i(t)); };
        });

      transition.selectAll("text")
        .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
        .on("start", function (d) {
          if (d.parent === focus) {
            this.style.display = "inline";
          }
        })
        .on("end", function (d) {
          if (d.parent !== focus) {
            this.style.display = "none";
          }
        });
    }

    function zoomTo(v) {
      var k = diameter / v[2];
      view = v;
      node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      circle.attr("r", function (d) { return d.r * k; });
    }
  }

  update(props) {
    this.props = _merge({}, this.props, props)

    this.redraw()
  }

  redraw() {
    this.selections.circles.style("fill", (d) => {
      if (d.children) {
        return this.color(d.depth)
      }

      if (this.props.selectedFile && d.data.path === this.props.selectedFile.path) {
        return "red"
      }

      return "white"
    })
  }

}