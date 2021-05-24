export const isSnippetNode = (node) => {
  if (node.name === 'Snippet') {
    return true
  }
  return false
}
