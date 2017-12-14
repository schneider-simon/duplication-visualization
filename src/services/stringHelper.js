import React from 'react';

export const renderLineRange = (startLine, endLine) => {
  if (startLine === endLine) {
    return startLine
  }

  return `${startLine}-${endLine}`
}

export const getFileNameFromPath = (path) => {
  const pieces = path.split('/')

  return pieces[pieces.length - 1]
}

export const renderCloneClass = (cloneClass) => {
  return `#${cloneClass.connections[0]} (nodes: ${cloneClass.count}, lines: ${cloneClass.lines}, lines total: ${cloneClass.linesTotal})`
}

export const renderFileMetrics = (fileMetrics) => {
  return `${fileMetrics.path} (duplicate lines: ${fileMetrics.duplicateLinesCount}, clones: ${fileMetrics.nodes.length})`
}