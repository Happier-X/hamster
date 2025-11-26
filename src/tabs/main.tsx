import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

function mainPage() {
  const [data, setData] = useState("")
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([])

  useEffect(() => {
    sendToBackground({
      name: "bookmarks",
      body: {
        action: "getBookmarks"
      }
    })
      .then((res) => {
        console.log(res)
        setBookmarks(res)
      })
      .catch((error) => {
        console.error("获取书签失败:", error)
      })
  }, [])
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id}>
          <h2>{bookmark.title}</h2>
          <ul>
            {bookmark.children?.map((child) => (
              <li key={child.id}>{child.title}</li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={() =>
          sendToBackground({
            name: "bookmarks",
            body: {
              action: "organizeBookmarks"
            }
          })
        }>
        整理
      </button>
    </div>
  )
}

export default mainPage
