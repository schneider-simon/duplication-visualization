import React from 'react';
import PropTypes from 'prop-types';
import {keyBy as _keyBy, sortBy as _sortBy, get as _get} from 'lodash'
import {renderCloneClass, renderFileMetrics} from "../services/stringHelper"
import {getLineNumbersFromEntries, getLinesAmountFromLocation, getReportPerFile} from "../services/duplicationReportService"

class QuickFacts extends React.Component {

  renderFile(file) {
    const label = renderFileMetrics(file)
    return <a href="#" onClick={() => this.props.onSelectFile(file)}>{label}</a>
  }

  render() {
    console.log("REPORT", this.props.report)
    if (!this.props.report) {
      return null
    }

    const nodes = _keyBy(this.props.report.nodes, 'id')
    const files = getReportPerFile(this.props.report);
    const filesMetrics = Object.keys(files).map((path) => {
      const nodes = files[path]
      const lines = getLineNumbersFromEntries(nodes)

      return {
        path: path,
        duplicateLines: lines,
        duplicateLinesCount: lines.length,
        nodes: nodes,
        entries: nodes
      }
    })

    const connectionLineSizes = this.props.report.connections.map(_connections => {
      const linesTotal = _connections.reduce((sum, id) => {
        const node = nodes[id]
        return sum + getLinesAmountFromLocation(node.location)
      }, 0)

      return {
        connections: _connections,
        count: _connections.length,
        lines: Math.ceil(linesTotal / _connections.length),
        linesTotal: linesTotal
      }
    })

    const classesSortedByCount = _sortBy(connectionLineSizes, 'count')
    const classesSortedByLines = _sortBy(connectionLineSizes, 'lines')
    const classesSortedByTotalLines = _sortBy(connectionLineSizes, 'linesTotal')
    const filesSortedByDuplicateLinesCount = _sortBy(filesMetrics, 'duplicateLinesCount')
    const filesSortedByDuplicatesCount = _sortBy(filesMetrics, 'nodes.length')

    const largestClassByNodes = classesSortedByCount[classesSortedByCount.length - 1]
    const largestClassByLines = classesSortedByLines[classesSortedByLines.length - 1]
    const largestClassByTotalLines = classesSortedByTotalLines[classesSortedByTotalLines.length - 1]

    const largestFileByDuplicateLines = filesSortedByDuplicateLinesCount[filesSortedByDuplicateLinesCount.length - 1]
    const largestFileByDuplicates = filesSortedByDuplicatesCount[filesSortedByDuplicatesCount.length - 1]

    return (
      <div>
        <table className="table">
          <tbody>
          <tr>
            <th>
              Project name
            </th>
            <td>
              {_get(this.props.report, 'project.name')}
            </td>
          </tr>
          <tr>
            <th>
              Project lines of code
            </th>
            <td>
              {_get(this.props.report, 'project.linesOfCode')}
            </td>
          </tr>
          <tr>
            <th>Clone classes</th>
            <td>{this.props.report.connections.length}</td>
          </tr>
          <tr>
            <th>Largest clone class by nodes</th>
            <td>{renderCloneClass(largestClassByNodes)}</td>
          </tr>
          <tr>
            <th>Largest clone class by lines</th>
            <td>{renderCloneClass(largestClassByLines)}</td>
          </tr>
          <tr>
            <th>Largest clone class by lines total</th>
            <td>{renderCloneClass(largestClassByTotalLines)}</td>
          </tr>
          <tr>
            <th>Files with clones</th>
            <td>{Object.keys(files).length}</td>
          </tr>
          <tr>
            <th>File with most cloned lines</th>
            <td>{this.renderFile(largestFileByDuplicateLines)}</td>
          </tr>
          <tr>
            <th>File with most distinct clones</th>
            <td>{this.renderFile(largestFileByDuplicates)}</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

QuickFacts.propTypes = {
  files: PropTypes.object,
  report: PropTypes.object,
  onSelectFile: PropTypes.func
};
QuickFacts.defaultProps = {};

export default QuickFacts;
