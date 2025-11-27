import type { PlasmoMessaging } from "@plasmohq/messaging"

import createCategory from "~models/createCategory"
import parseTreeToMarkdown from "~utils/parse"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { action } = req.body
  switch (action) {
    case "getBookmarks":
      const bookmarks = await chrome.bookmarks.getTree()
      res.send(bookmarks)
      break
    case "organizeBookmarks":
      const bookmarksTree = await chrome.bookmarks.getTree()
      const markdown = parseTreeToMarkdown(bookmarksTree)
      console.log(1111111, markdown)
      const response = await createCategory(markdown)
      console.log(response)
      res.send({ message: "书签整理完成" })
      break
  }
}

export default handler
