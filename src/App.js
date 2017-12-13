import React, {Component} from 'react';
import './App.css';
import {getDuplicatesJson} from "./services/apiService"
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/styles/hljs';
import {getDuplicationReportDirectories, getLineNumbersFromEntries} from "./services/duplicationReportService"
import {drawPackedCirclesChart} from "./services/packedCirclesChart"

import files from "./data/files"

console.log("files", files)

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedFile: null
    }
  }

  componentDidMount() {
    getDuplicatesJson()
      .then(console.log)
      .catch(console.error)

    const directories = getDuplicationReportDirectories(require("./data/duplicates.json"))

    const onFileClick = (file) => {
      this.setState({
        selectedFile: file
      })
    }

    window.setTimeout(() => {
      drawPackedCirclesChart({selector: "#chart", data: directories, onFileClick: onFileClick});

    }, 500)
    console.log(directories);
  }

  lineStyle(codeNumber) {
    console.log("linestyle", codeNumber)
    return {
      backgroundColor: "red"
    }
  }

  lineNumberStyle(codeNumber) {
    console.log("codenumber", codeNumber)

    const fileData = this.state.selectedFile
    const duplicateLines = getLineNumbersFromEntries(fileData.entries)

    if(duplicateLines.indexOf(codeNumber) !== -1){
      return {
        background: "rgba(255,0,0,0.5)"
      }
    }

    return {}
  }

  renderSelectedFilePreview() {
    if (!this.state.selectedFile) {
      return
    }

    const file = files[this.state.selectedFile.path]

    if (!file) {
      return
    }


    return <div>
      <h3>{this.state.selectedFile.path}</h3>
      <SyntaxHighlighter lineNumberStyle={this.lineNumberStyle.bind(this)} lineStyle={this.lineStyle.bind(this)} showLineNumbers={true} language='java' style={docco}>
        {file}
      </SyntaxHighlighter>
    </div>
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>

        <table className="packed-circles-view">
          <tbody>
          <tr>
            <td>
              <svg width="600" height="600" id="chart"/>
            </td>
            <td>
              {this.renderSelectedFilePreview()}
            </td>
          </tr>
          </tbody>
        </table>

      </div>
    );
  }
}

export default App;
