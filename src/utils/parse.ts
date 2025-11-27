interface BookmarkNode {
  id?: string
  title?: string
  url?: string
  dateAdded?: number
  dateLastUsed?: number
  index?: number
  parentId?: string
  syncing?: boolean
  children?: BookmarkNode[]
}

const parseTreeToMarkdown = (tree: BookmarkNode[]): string => {
  let markdown = ""

  const processNode = (node: BookmarkNode, level: number = 0): void => {
    if (node.url) {
      // 这是一个书签（叶子节点）
      markdown += `- [${node.title || "无标题"}](${node.url})\n`
    } else if (node.children && node.children.length > 0) {
      // 这是一个文件夹
      if (node.title) {
        const prefix = "#".repeat(level + 1)
        markdown += `${prefix} ${node.title}\n`
      }

      // 处理所有子节点
      node.children.forEach((child) => {
        processNode(child, level + 1)
      })
    }
  }

  // 处理树的每个顶级节点
  tree.forEach((node) => {
    processNode(node)
  })

  return markdown.trim()
}

export default parseTreeToMarkdown
