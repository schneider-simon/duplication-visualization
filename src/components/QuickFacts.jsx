import React from 'react';
import PropTypes from 'prop-types';
import {keyBy as _keyBy, sortBy as _sortBy} from 'lodash'
import {renderCloneClass, renderFileMetrics} from "../services/stringHelper"
import {getLineNumbersFromEntries, getLinesAmountFromLocation, getReportPerFile} from "../services/duplicationReportService"

class QuickFacts extends React.Component {
  render() {
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
        nodes: nodes
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
            <td>{renderFileMetrics(largestFileByDuplicateLines)}</td>
          </tr>
          <tr>
            <th>File with most cloned lines</th>
            <td>{renderFileMetrics(largestFileByDuplicates)}</td>
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
