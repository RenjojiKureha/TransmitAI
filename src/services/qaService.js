// 问答相关的数据库操作服务

import { Message } from '../models/messageModel.js';

/**
 * 根据用户ID获取聊天历史记录。
 * @param {string} userId - 用户ID。
 * @param {number} [limit=5] - 返回记录的最大数量，默认为5。
 * @returns {Promise<Array>} - 返回按时间倒序排列的消息文档数组。
 */
export const getChatHistory = async (userId, limit = 5) => {
  return await Message.find({ userId })
    .sort({ timestamp: -1 }) // 按时间戳降序排序
    .limit(limit)             // 限制返回数量
    .exec();                  // 执行查询
};

/**
 * 保存用户的提问和AI的回答到数据库。
 * @param {string} userId - 用户ID。
 * @param {string} question - 用户提出的问题。
 * @param {string} answer - AI生成的回答。
 */
export const saveChatRecord = async (userId, question, answer) => {
  // 创建并保存用户的消息
  const userMessage = new Message({
    userId,
    role: 'user',
    content: question,
    timestamp: new Date(),
    // 注意：根据你的 messageModel，model, promptTokens, completionTokens 是必需的
    // 这里需要补充这些字段的逻辑
  });
  await userMessage.save();

  // 创建并保存AI助手的消息
  const assistantMessage = new Message({
    userId,
    role: 'assistant',
    content: answer,
    timestamp: new Date(),
    // 同上，需要补充模型和token信息
  });
  await assistantMessage.save();
};