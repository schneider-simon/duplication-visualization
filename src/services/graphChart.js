import vis from 'vis'
import {get as _get, cloneDeep as _cloneDeep} from "lodash"
import {getEdgesFromReport, getFileEdgesFromReport, getFileNodesFromReport, getNodesFromReport} from "./duplicationReportService"

export class GraphChart {
  constructor(props) {
    this.props = props

    this.network = null

    this.nodes = null
    this.edges = null

    this.init();
  }

  init() {
    const data = this.props.data;

    if (!this.props.useClones) {
      this.nodes = new vis.DataSet(getFileNodesFromReport(data))
      this.edges = new vis.DataSet(getFileEdgesFromReport(data))
    } else {
      this.nodes = new vis.DataSet(getNodesFromReport(data))
      this.edges = new vis.DataSet(getEdgesFromReport(data))
    }

    const container = document.querySelector(this.props.selector)
    const networkData = {
      nodes: this.nodes,
      edges: this.edges
    }

    const options = {
      edges: {
        smooth: false
      }
    }

    this.network = new vis.Network(container, networkData, options);

    this.network.on("stabilizationIterationsDone", () => {
      this.network.setOptions({physics: true});
    })

    this.network.on("selectNode", (selection) => {
      if (this.props.useClones) {
        return
      }

      this.props.onSelectFile(selection.nodes[0])
    })
  }

  update(nextProps) {
    const oldProps = this.props

    this.props = Object.assign({}, oldProps, nextProps)

    if (oldProps.selectedFile !== this.props.selectedFile && this.network) {
      this.network.setSelection({
        nodes: (this.props.selectedFile) ? [this.props.selectedFile.path] : []
      })
    }
  }
}