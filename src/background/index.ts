// 点击扩展图标时，打开主页面
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("tabs/main.html")
  })
})
