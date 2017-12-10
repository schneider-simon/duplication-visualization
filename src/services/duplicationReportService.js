import _groupBy from 'lodash/groupBy'
import _trim from 'lodash/trim'

export const getDuplicationReportDirectories = (duplicationReport) => {
  const directories = {"name": "flare", "children": []};

  const filesData = getReportPerFile(duplicationReport);

  Object.keys(filesData).forEach((location) => {
    const pieces = _trim(location, '/').split("/")
    const entries = filesData[location];
    const lines = entries.reduce((lines, entry) => lines.concat(entry.lines), [])

    let currentObject = directories;
    pieces.forEach((piece, i) => {
      const isLast = i === pieces.length - 1;

      if (isLast) {
        currentObject.children.push({name: piece, size: lines.length})
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

  console.log("FILES", files)

  return files;
}

export const getDuplicationNodeSize = (node) => {
  if (!node || !node.length) {
    return 0;
  }

  return Math.max(node.endLine - node.startLine, 1)
}