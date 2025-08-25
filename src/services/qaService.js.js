import { Message } from '../models/messageModel.js';
import { User } from '../models/userModel.js';

// 获取聊天历史记录
export const getChatHistory = async (userId, limit = 5) => {
  return await Message.find({ userId })
    .sort({ timestamp: -1 })
    .limit(limit)
    .exec();
};

// 保存聊天记录
export const saveChatRecord = async (userId, question, answer) => {
  const message = new Message({
    userId,
    role: 'user',
    content: question,
    timestamp: new Date(),
  });
  await message.save();

  const assistantMessage = new Message({
    userId,
    role: 'assistant',
    content: answer,
    timestamp: new Date(),
  });
  await assistantMessage.save();
};