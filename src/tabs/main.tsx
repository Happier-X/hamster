import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

import "../style.css"

import { Button, InputGroup } from "@heroui/react"

import { sendToBackground } from "@plasmohq/messaging"

function mainPage() {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([])
  const [timeString, setTimeString] = useState<string>("")

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
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }

      setTimeString(now.toLocaleTimeString("zh-CN", timeOptions))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])
  const [query, setQuery] = useState<string>("")

  return (
    <div className="w-screen h-screen bg-background flex flex-col items-center">
      <div className="text-4xl font-light text-foreground font-mono pb-4 pt-[15vh]">
        {timeString}
      </div>
      <InputGroup className="w-2/5">
        <InputGroup.Prefix>
          <Icon icon="simple-icons:google" />
        </InputGroup.Prefix>
        <InputGroup.Input
          aria-label="SearchInput"
          placeholder="搜索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.open(`https://www.google.com/search?q=${query}`)
              setQuery("")
            }
          }}
        />
        <InputGroup.Suffix>
          <Button
            isIconOnly
            aria-label="Search"
            size="sm"
            variant="ghost"
            onPress={() => {
              window.open(`https://www.google.com/search?q=${query}`)
              setQuery("")
            }}>
            <Icon icon="lucide:search" />
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </div>
  )
}

export default mainPage
