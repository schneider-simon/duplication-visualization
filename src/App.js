import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-table/react-table.css'
import './App.css';
import './styles/icons/css/fontello.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {createElement as highlighterCreateElement} from 'react-syntax-highlighter';
import {tomorrowNightEighties} from 'react-syntax-highlighter/styles/hljs';
import {
  fileObjectFromPath, getClassByEntry, getDuplicationClasses, getDuplicationReportDirectories, getEntriesFromLineNumber, getLargestEntry,
  getLineNumbersFromEntries
} from "./services/duplicationReportService"
import {get as _get} from "lodash"
import RawReport from "./components/RawReport"
import {PackedCirclesChart} from "./services/packedCirclesChart"
import {GraphChart} from "./services/graphChart"
import QuickFacts from "./components/QuickFacts"
import * as classnames from "classnames"
import {Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap"
import {renderLocation} from "./services/stringHelper"

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedFile: null,
      files: {},
      //report: null,
      report: require('./data/duplicates.json'),
      reportInput: "",
      activeTab: "facts",
      modalData: null
    }

    this.packedCirclesChart = null
    this.graphChart = null

    this.onSelectFile = this.onSelectFile.bind(this)
  }

  onSelectFile(file) {
    if (typeof file === "string") {
      file = fileObjectFromPath(file, this.state.report)
    }

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

    if (this.graphChart) {
      this.graphChart.update({
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

      this.graphChart = new GraphChart({
        selector: "#graph-chart",
        data: this.state.report,
        onSelectFile: this.onSelectFile
      });

    }, 500)
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

  renderSelectedFilePreview() {
    if (!this.state.selectedFile) {
      return
    }

    const file = this.state.files[this.state.selectedFile.path]

    if (!file) {
      return
    }

    return <div>
      <div className="syntax-highlight">
        <SyntaxHighlighter
          showLineNumbers={true}
          language='java'
          style={tomorrowNightEighties}
          wrapLines={true}
          renderer={this.customRenderer.bind(this)}
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
      <h3>{(this.state.selectedFile) ? this.state.selectedFile.path : "-"}</h3>
      {this.renderTabs()}
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="circles">
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
        {this.renderModal()}
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

  showModal(modalData) {
    this.setState({
      modalData
    })
  }

  renderModal() {
    const data = this.state.modalData
    const toggle = () => this.showModal(null)

    const renderNodes = () => {
      if (!data || !data.cloneClass || !data.cloneClass.nodes) {
        return null
      }

      return data.cloneClass.nodes.map(node => {
        return <li>{renderLocation(node.location)}</li>
      })
    }

    return <Modal isOpen={this.state.modalData !== null} toggle={toggle}>
      <ModalHeader toggle={toggle}>Selected clone class</ModalHeader>
      <ModalBody>
        <ul>{renderNodes()}</ul>
      </ModalBody>
    </Modal>
  }

  customRenderer({rows, stylesheet, useInlineStyles}) {
    const fileData = this.state.selectedFile
    const duplicateLines = getLineNumbersFromEntries(fileData.entries)
    const cloneClasses = getDuplicationClasses(this.state.report)

    return (
      rows.map((node, i) => {
        const element = highlighterCreateElement({
          node,
          stylesheet,
          useInlineStyles,
          key: `code-segement${i}`
        })

        const lineNumber = i + 1

        const entries = getEntriesFromLineNumber(fileData.entries, lineNumber)
        const isClone = duplicateLines.indexOf(lineNumber) !== -1;
        const duplicateFiles = _get(this.state.report, 'project.duplicateFiles', {})
        const isCodeClone = duplicateFiles[fileData.path] && duplicateFiles[fileData.path].indexOf(lineNumber) !== -1

        const mainEntry = getLargestEntry(entries)
        let onClick = null

        if (mainEntry) {
          const cloneClass = getClassByEntry(mainEntry, cloneClasses)
          onClick = () => this.showModal({cloneClass: cloneClass, entry: mainEntry})
        }

        return <div onClick={onClick} key={i} title={(mainEntry) ? mainEntry.id : "-"}
                    className={classnames({"code-line": true, "is-clone": isClone, "is-code-clone": isCodeClone})}>{element}</div>
      })
    );
  }
}

export default App;
