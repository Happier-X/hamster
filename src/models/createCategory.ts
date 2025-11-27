import { ChatOpenAI } from "@langchain/openai"

const createCategory = async (markdown: string) => {
  const createCategoryPrompt = `
你是一个书签分类助手，你的任务是根据用户给你的url，创建一个分类。
用户会给你一个书签列表，你需要根据书签的标题和URL，创建一个分类。
`

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: "sk-gEsnEwTUGCYoJxiC9Ojr4f0m5N5ftJunTytHyCDvkp8xWw6C",
    configuration: {
      baseURL: "https://x666.me/v1"
    },
    temperature: 0,
    streaming: true
  })

  const response = await model.invoke("帮我将这个书签列表分类：" + markdown)
  return response
}

export default createCategory
