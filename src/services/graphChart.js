import vis from 'vis'
import {getEdgesFromReport, getFileEdgesFromReport, getFileNodesFromReport, getNodesFromReport} from "./duplicationReportService"

export const drawGraphChart = ({selector, data, useClones}) => {
  let nodes, edges;

  if (!useClones) {
    nodes = new vis.DataSet(getFileNodesFromReport(data))
    edges = new vis.DataSet(getFileEdgesFromReport(data))
  } else {
    nodes = new vis.DataSet(getNodesFromReport(data))
    edges = new vis.DataSet(getEdgesFromReport(data))
  }

  // create a network
  var container = document.querySelector(selector);
  var networkData = {
    nodes: nodes,
    edges: edges
  };

  var options = {
    edges: {
      smooth: false
    }
  };

  const network = new vis.Network(container, networkData, options);

  network.on("stabilizationIterationsDone", function () {
    network.setOptions({physics: true});
  })
}
