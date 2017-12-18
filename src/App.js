import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-table/react-table.css'
import './App.css';
import './styles/icons/css/fontello.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {tomorrowNightEighties} from 'react-syntax-highlighter/styles/hljs';
import {getDuplicationReportDirectories, getLineNumbersFromEntries} from "./services/duplicationReportService"
import {get as _get} from "lodash"
import RawReport from "./components/RawReport"
import {PackedCirclesChart} from "./services/packedCirclesChart"
import {drawGraphChart, GraphChart} from "./services/graphChart"
import QuickFacts from "./components/QuickFacts"
import * as classnames from "classnames"
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap"

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedFile: null,
      files: {},
      //report: null,
      report: require('./data/duplicates.json'),
      reportInput: "",
      activeTab: "facts"
    }

    this.packedCirclesChart = null
    this.graphChart = null

    this.onSelectFile = this.onSelectFile.bind(this)
  }

  onSelectFile(file) {
    const url = `projects/${this.state.report.project.name}${file.path}`

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
    this.onInitReport()
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.packedCirclesChart) {
      this.packedCirclesChart.update({
        selectedFile: this.state.selectedFile
      })
    }

    if (!previousState.report && this.state.report) {
      this.onInitReport()
    }
  }

  onInitReport() {
    if (!this.state.report) {
      return
    }

    const directories = getDuplicationReportDirectories(this.state.report)

    window.setTimeout(() => {
      this.packedCirclesChart = new PackedCirclesChart({
        selector: "#chart",
        data: directories,
        onFileClick: this.onSelectFile.bind(this),
        selectedFile: this.state.selectedFile
      });

      this.graphChart = new GraphChart({selector: "#graph-chart", data: this.state.report});

    }, 500)
    console.log(directories);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onUseReportInput() {
    const report = JSON.parse(this.state.reportInput);

    this.setState({
      report: report
    })
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

  renderReportInput() {
    const isDisabled = () => {
      try {
        const report = JSON.parse(this.state.reportInput)
        return !report.project || !report.connections;
      } catch (e) {
        return true
      }
    }

    const onClick = () => {
      if (isDisabled()) {
        return;
      }

      return this.onUseReportInput()
    }

    return <div className="report-input container">
      <textarea className="form-control" value={this.state.reportInput} onChange={e => this.setState({reportInput: e.target.value})}/>
      <button disabled={isDisabled()} onClick={onClick} className="btn btn-primary btn-block">Visualize</button>
    </div>
  }

  renderReport() {
    if (!this.state.report) {
      return this.renderReportInput();
    }

    return <div className="app-report">
      <h1>Project: {_get(this.state.report, 'project.name')}</h1>
      {this.renderTabs()}
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="circles">
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
        </TabPane>
        <TabPane tabId="graph">
          <div id="graph-chart"/>
        </TabPane>
        <TabPane tabId="facts">
          <QuickFacts files={this.state.files} report={this.state.report} onSelectFile={this.onSelectFile}/>
        </TabPane>
        <TabPane tabId="raw">
          <RawReport files={this.state.files} report={this.state.report} onSelectFile={this.onSelectFile}/>
        </TabPane>

      </TabContent>
    </div>
  }

  render() {
    return (
      <div className="App">
        {this.renderReport()}
      </div>
    );
  }

  renderTabs() {
    return <Nav tabs>
      <NavItem>
        <NavLink
          className={classnames({active: this.state.activeTab === 'facts'})}
          onClick={() => { this.toggle('facts'); }}
        >
          <i className="icon-list"/> Facts
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({active: this.state.activeTab === 'circles'})}
          onClick={() => { this.toggle('circles'); }}
        >
          <i className="icon-sitemap"/> Packed circles map
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({active: this.state.activeTab === 'graph'})}
          onClick={() => { this.toggle('graph'); }}
        >
          <i className="icon-graph"/> Graph
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({active: this.state.activeTab === 'raw'})}
          onClick={() => { this.toggle('raw'); }}
        >
          <i className="icon-grid"/> Raw
        </NavLink>
      </NavItem>
    </Nav>
  }
}

export default App;
