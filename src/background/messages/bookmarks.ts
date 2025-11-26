import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { action } = req.body
  switch (action) {
    case "getBookmarks":
      const bookmarks = await chrome.bookmarks.getTree()
      res.send(bookmarks)
      break
    case "organizeBookmarks":
      res.send({ message: "书签整理完成" })
      break
  }
}

export default handler
