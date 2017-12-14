import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-table/react-table.css'
import './App.css';
import {getDuplicatesJson} from "./services/apiService"
import SyntaxHighlighter from 'react-syntax-highlighter';
import {tomorrowNightEighties} from 'react-syntax-highlighter/styles/hljs';
import {getDuplicationReportDirectories, getLineNumbersFromEntries} from "./services/duplicationReportService"
import {get as _get} from "lodash"
import RawReport from "./components/RawReport"
import {PackedCirclesChart} from "./services/packedCirclesChart"
import {drawGraphChart} from "./services/graphChart"

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedFile: null,
      files: {},
      report: require("./data/duplicates2.json")
    }

    this.packedCirclesChart = null

    this.onSelectFile = this.onSelectFile.bind(this)
  }

  onSelectFile(file) {
    const url = `projects/${this.state.report.project.directory}${file.path}`

    if (this.state.report.project && typeof this.state.files[file.path] === 'undefined') {
      fetch(url)
        .then(response => response.text())
        .then(text => {
          const files = this.state.files
          files[file.path] = text

          this.setState({
            files
          })
        })
        .catch(console.error)
    }

    this.setState({
      selectedFile: file
    })
  }

  componentDidMount() {
    getDuplicatesJson()
      .then(console.log)
      .catch(console.error)

    const directories = getDuplicationReportDirectories(this.state.report)

    window.setTimeout(() => {
      this.packedCirclesChart = new PackedCirclesChart({
        selector: "#chart",
        data: directories,
        onFileClick: this.onSelectFile.bind(this),
        selectedFile: this.state.selectedFile
      });

      drawGraphChart({selector: "#graph-chart", data: this.state.report});

    }, 500)
    console.log(directories);
  }

  componentDidUpdate() {
    if (this.packedCirclesChart) {
      this.packedCirclesChart.update({
        selectedFile: this.state.selectedFile
      })
    }
  }

  lineStyle(lineNumber) {
    const fileData = this.state.selectedFile
    const duplicateLines = getLineNumbersFromEntries(fileData.entries)
    const style = {display: 'block'}

    const isClone = duplicateLines.indexOf(lineNumber) !== -1;

    if (isClone) {
      style.backgroundColor = "rgba(255,0,0,0.5)";
    }

    return style;
  }

  renderSelectedFilePreview() {
    if (!this.state.selectedFile) {
      return
    }

    const file = this.state.files[this.state.selectedFile.path]

    if (!file) {
      return
    }

    return <div>
      <h3>{this.state.selectedFile.path}</h3>
      <div className="syntax-highlight">
        <SyntaxHighlighter
          showLineNumbers={true}
          language='java'
          style={tomorrowNightEighties}
          wrapLines={true}
          lineStyle={this.lineStyle.bind(this)}
        >
          {file}
        </SyntaxHighlighter>
      </div>
    </div>
  }

  render() {
    return (
      <div className="App">
        <h1>Project: {_get(this.state.report, 'project.directory')}</h1>

        <table className="packed-circles-view">
          <tbody>
          <tr>
            <td>
              <h3>&nbsp;</h3>
              <svg width="600" height="600" id="chart"/>
            </td>
            <td>
              {this.renderSelectedFilePreview()}
            </td>
          </tr>
          </tbody>
        </table>

        <hr/>
        <div id="graph-chart">

        </div>

        <hr/>

        <RawReport files={this.state.files} report={this.state.report} onSelectFile={this.onSelectFile}/>

      </div>
    );
  }
}

export default App;
