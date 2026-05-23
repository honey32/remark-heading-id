const _ = require('lodash')

const isNonEmptyString = value => {
  if (value == null) {
    return false
  }
  if (typeof value === 'string') {
    return value.length > 0
  }
  return false
}

const extractText = children => {
  return children
    .map(child => {
      if (isNonEmptyString(child.value)) {
        return child.value
      } else if (child.children && child.children.length > 0) {
        return extractText(child.children)
      } else {
        return ''
      }
    })
    .join(' ')
}

const getDefaultId = children => {
  return formatDefaultId(extractText(children))
}

const formatDefaultId = value => {
  return _.kebabCase(value.replace(/\\s+/g, ' ').trim())
}

const setNodeId = (node, id) => {
  if (!node.data) node.data = {}
  if (!node.data.hProperties) node.data.hProperties = {}
  node.data.id = node.data.hProperties.id = id
}

module.exports = { extractText, getDefaultId, formatDefaultId, setNodeId }
