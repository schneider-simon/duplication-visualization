import React, {Component} from 'react';
import './App.css';
import {getDuplicatesJson} from "./services/apiService"
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/styles/hljs';
import {EXAMPLE_DUPLICATION_REPORT, getDuplicationReportDirectories} from "./services/duplicationReportService"
import {drawPackedCirclesChart} from "./services/packedCirclesChart"

class App extends Component {

  componentDidMount() {
    console.log("DID MOUNT")

    getDuplicatesJson()
      .then(console.log)
      .catch(console.error)

    const directories = getDuplicationReportDirectories(EXAMPLE_DUPLICATION_REPORT);
    window.setTimeout(() => {
      drawPackedCirclesChart({selector: "#chart", data: directories});

    }, 500)
    console.log(directories);
  }

  lineStyle(codeNumber) {
    return {
      backgroundColor: "red"
    }
  }

  render() {
    const code = "console.log(\"Hello world\");\nconsole.log(\"Hello world 2\");"
    return (
      <div className="App">
        <h1>App</h1>
        <SyntaxHighlighter lineStyle={this.lineStyle.bind(this)} showLineNumbers={true} startingLineNumber={4} language='javascript' style={docco}>
          {code}
        </SyntaxHighlighter>
        <svg width="600" height="600" id="chart">

        </svg>
      </div>
    );
  }
}

export default App;
