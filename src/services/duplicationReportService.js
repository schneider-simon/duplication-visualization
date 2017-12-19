import _groupBy from 'lodash/groupBy'
import _trim from 'lodash/trim'
import _flatten from 'lodash/flatten'
import _uniq from 'lodash/uniq'
import _tail from 'lodash/tail'
import _keyBy from 'lodash/keyBy'
import _values from 'lodash/values'
import _get from 'lodash/get'
import _sortBy from 'lodash/sortBy'
import {getFileNameFromPath} from "./stringHelper"

export const getDuplicateLinesForFile = (path, report) => {
  let lines = _get(report, 'project.duplicateFiles', {})[path]

  if (!lines) {
    return []
  }

  return lines;
}

export const getDuplicationReportDirectories = (duplicationReport) => {
  const directories = {"name": "flare", "children": []};

  const filesData = getReportPerFile(duplicationReport);

  Object.keys(filesData).forEach((location) => {
    const pieces = _trim(location, '/').split("/")
    const entries = filesData[location];
    const lines = getDuplicateLinesForFile(location, duplicationReport)

    let currentObject = directories;
    pieces.forEach((piece, i) => {
      const isLast = i === pieces.length - 1;

      if (isLast) {
        const path = (entries[0] && entries[0].location) ? entries[0].location.path : ""

        currentObject.children.push({name: piece, size: lines.length, entries, path})
        return;
      }

      const child = currentObject.children.find(child => child.name === piece);

      if (!child) {
        currentObject.children.push({"name": piece, "children": []});
        currentObject = currentObject.children[currentObject.children.length - 1];
        return;
      }

      currentObject = child;

    })
  })

  return directories
}

export const getReportPerFile = (duplicationReport) => {
  const files = _groupBy(duplicationReport.nodes, 'location.path')

  Object.keys(files).map((filePath) => {
    const nodes = files[filePath]

    const size = nodes.reduce((sum, node) => {
      return sum + getDuplicationNodeSize(node)
    }, 0)

    return {
      size,
      value: filePath,
      nodes: nodes
    }
  })

  return files;
}

export const getDuplicationNodeSize = (node) => {
  if (!node || !node.length) {
    return 0;
  }

  if (node.linesOfCode) {
    return node.linesOfCode
  }

  return Math.max(node.endLine - node.startLine, 1)
}

export const getLineNumbersFromLocation = (location) => {
  if (!location || !location.length) {
    return []
  }

  const array = [];

  for (let i = location.startLine; i <= location.endLine; i++) {
    array.push(i)
  }

  return array
}

export const getLinesAmountFromLocation = (location) => {
  if (!location || !location.length) {
    return 0
  }

  if (location.linesOfCode) {
    return location.linesOfCode
  }

  return (location.endLine - location.startLine) + 1
}

export const getLineNumbersFromEntries = (entries) => {
  const lines = entries.map((entry) => {
    return getLineNumbersFromLocation(entry.location)
  })

  return _uniq(lines.reduce((a, lines) => {
    return a.concat(lines)
  }, []))
}

export const getEntriesFromLineNumber = (entries, lineNumber) => {
  return entries.filter((entry) => {
    const lines = getLineNumbersFromLocation(entry.location);
    return lines.indexOf(lineNumber) !== -1
  })
}

export const getLargestEntry = (entries) => {
  if (!entries || entries.length === 0) {
    return null
  }

  return _sortBy(entries, (entry) => {
    return getLinesAmountFromLocation(entry.location)
  })[entries.length - 1]
}

export const getNodesFromReport = (report) => {
  return report.nodes.map((node) => {
    return {
      id: node.id,
      label: node.id,
      data: node
    }
  })
}

export const getEdgesFromReport = (report) => {
  return report.connections.reduce((a, connectionList) => {
    const edges = []

    for (let i = 0; i !== connectionList.length; i++) {
      for (let j = i + 1; j < connectionList.length; j++) {
        const connection = [connectionList[i], connectionList[j]].sort()

        edges.push({
          from: connection[0],
          to: connection[1]
        })
      }
    }

    return a.concat(edges)
  }, [])
}

export const getFileNodesFromReport = (report) => {
  const files = getReportPerFile(report)

  return Object.keys(files).map(path => {
    const file = files[path]
    return {
      id: path,
      label: "",
      title: path,
      data: file
    }
  })
}

export const getFileEdgesFromReport = (report) => {
  const files = getReportPerFile(report)
  const clones = _keyBy(report.nodes, 'id')

  const edges = []

  Object.keys(files).forEach(path => {
    const nodes = files[path]
    const connections = _uniq(nodes.reduce((a, node) => {
      const connectionsToNode = getConnectionsForId(node.id, report)
      return a.concat(connectionsToNode)
    }, []))

    const connectedFiles = _uniq(connections.map(id => {
      return _get(clones[id], 'location.path')
    })).filter(_path => _path !== path)

    connectedFiles.forEach(_path => {
      const paths = [path, _path].sort()
      edges.push({
        from: paths[0],
        to: paths[1]
      })
    })
  })

  return edges
}

export const getConnectionsForId = (id, report) => {
  return report.connections.find(ids => {
    return ids.indexOf(parseInt(id)) !== -1
  })
}

export const getDuplicationClasses = (report) => {
  const nodes = _keyBy(report.nodes, 'id')

  const duplicationClasses = report.connections.map((connections) => {
    const duplicationClass = {
      id: connections[0],
      connections: connections,
      nodes: connections.map(id => nodes[id]),
    }

    duplicationClass.length = getLinesAmountFromLocation(duplicationClass.nodes[0].location)
    duplicationClass.files = _uniq(duplicationClass.nodes.map((node) => {
      return _get(node, 'location.path')
    }))

    return duplicationClass
  })

  return duplicationClasses
}

export const getClassByEntry = (entry, cloneClasses) => {
  const cloneClass = cloneClasses.find(cloneClass => {
    return cloneClass.nodes.findIndex(node => {
      return parseInt(node.id) === parseInt(entry.id)
    }) !== -1
  })

  return cloneClass
}

export const getDuplicateLines = (report) => {
  const files = _get(report, "project.duplicateFiles", {});

  return Object.keys(files).reduce((sum, path) => {
    return sum + files[path].length
  }, 0)
}

export const fileObjectFromPath = (path, report) => {
  const pieces = _trim(path, '/').split("/")
  const name = pieces[pieces.length - 1]

  const nodes = report.nodes.filter((node) => {
    return _get(node, 'location.path') === path
  })

  return {
    name,
    path,
    entries: nodes
  }
}

export const processReport = (report) => {
  return report
  const doubleNodesPerLocation = _values(_groupBy(report.nodes, (node) => {
    return _get(node, 'location.path') + '|' + _get(node, 'location.startLine') + '-' + _get(node, 'location.endLine');
  })).filter(nodes => nodes.length > 1)

  const mapping = {}

  doubleNodesPerLocation.forEach((nodes) => {
    const head = nodes[0]
    const tail = _tail(nodes)

    tail.forEach((tailNode) => {
      mapping[tailNode.id] = head.id;
    })
  })

  report.nodes = report.nodes.filter((node) => {
    return !mapping[node.id]
  })

  report.connections = report.connections.map(connections => {
    return _uniq(connections.map(id => {
      if (!mapping[id]) {
        return id
      }

      return parseInt(mapping[id])
    }))
  }).filter(connections => {
    return connections.length >= 2
  })

  return report
}