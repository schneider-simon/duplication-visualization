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