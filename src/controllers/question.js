// 问答服务核心流程控制器

import { Hono } from 'hono';
import { OpenAI } from 'openai';
import { getChatHistory, saveChatRecord } from '../services/qaService.js';

// 初始化 Hono 路由
const qaRoute = new Hono();

// 定义 POST /ask 接口的处理逻辑
qaRoute.post('/ask', async (c) => {
  // 从鉴权中间件注入的上下文中获取用户信息
  const user = c.get('user');
  // 从请求体中解析出问题
  const { question } = await c.req.json();

  // 1. 从数据库获取用户的最近聊天历史
  const history = await getChatHistory(user.id, 5); // 示例：取最近5条

  // 2. 构建用于调用大模型的 Prompt
  // 将历史对话和新问题格式化，为大模型提供上下文
  const prompt = `
    用户上下文：
    ${history.map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n')}
    新问题：${question}
  `;

  // 3. 初始化 OpenAI 客户端并调用大模型
  const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo', // 指定使用的模型
    messages: [{ role: 'user', content: prompt }] // 将构建好的 prompt 作为用户消息发送
  });

  // 提取大模型返回的回答内容
  const answer = response.choices[0].message.content;

  // 4. 将新的问答记录存储到数据库
  await saveChatRecord(user.id, question, answer);
  
  // 5. 将回答以 JSON 格式返回给客户端
  return c.json({ answer });
});

// 导出路由，虽然这里是控制器，但 Hono 的设计允许这样灵活组织
export default qaRoute;