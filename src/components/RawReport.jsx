import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import {getDuplicationClasses} from "../services/duplicationReportService"
import {get as _get, trim as _trim} from 'lodash'
import {renderLineRange} from "../services/stringHelper"

class RawReport extends React.Component {
  onSelectFile(path) {
    this.props.onSelectFile(path)
  }

  renderRowDetails(row) {
    const cloneClass = row.original

    const renderFile = (path) => {
      const nodes = cloneClass.nodes.filter((node) => {
        return _get(node, 'location.path') === path
      })

      return <tr className="clone-file-details" onClick={() => this.onSelectFile(path)} key={path}>
        <td>{path}</td>
        <td>{nodes.map(node => renderLineRange(_get(node, 'location.startLine'), _get(node, 'location.endLine'))).join(', ')}</td>
      </tr>
    }

    return <div key={cloneClass.id}>
      <table className="table">
        <thead>
        <tr>
          <th>Path</th>
          <th>Lines</th>
        </tr>
        </thead>
        <tbody>
        {cloneClass.files.map(renderFile)}
        </tbody>
      </table>
    </div>
  }

  render() {
    const classes = getDuplicationClasses(this.props.report)

    const data = classes

    const columns = [{
      Header: 'ID',
      accessor: 'id'
    }, {
      Header: 'Files',
      accessor: 'files.length',
    }, {
      Header: 'Duplicates',
      accessor: 'nodes.length',
    }, {
      Header: "Lines",
      accessor: 'length'
    }]

    return (
      <div className="raw-report">
        <ReactTable
          filterable={true}
          id='id'
          data={data}
          columns={columns}
          SubComponent={this.renderRowDetails.bind(this)}
        />
      </div>
    )
  }
}

RawReport.propTypes = {
  files: PropTypes.object,
  report: PropTypes.object,
  onSelectFile: PropTypes.func
};
RawReport.defaultProps = {};

export default RawReport;
