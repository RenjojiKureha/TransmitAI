// 问答服务核心流程

import { OpenAI } from 'openai';
import { getChatHistory, saveChatRecord } from '../services/qaService.js';

const qaRoute = new Hono();

qaRoute.post('/ask', async (c) => {
  const user = c.get('user');
  const { question } = await c.req.json();

  // 1. 获取历史记录
  const history = await getChatHistory(user.id, 5); // 取最近5条

  // 2. 构建Prompt
  const prompt = `
    用户上下文：
    ${history.map(h => `Q: ${h.question}\nA: ${h.answer}`).join('\n')}
    新问题：${question}
  `;

  // 3. 调用大模型
  const openai = new OpenAI(process.env.OPENAI_KEY);
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: prompt }]
  });

  const answer = response.choices[0].message.content;

  // 4. 存储记录并返回
  await saveChatRecord(user.id, question, answer);
  return c.json({ answer });
});