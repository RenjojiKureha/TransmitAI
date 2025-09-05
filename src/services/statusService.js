// 用户状态管理相关的数据库操作服务

// 注意：userModel.js 中没有导出 UserState，这里假设它是一个独立的模型或应为 User
import { User } from '../models/userModel.js'; 

// 每日最大提问次数限制（示例，可以从配置中读取）
const MAX_DAILY_QUERIES = 10; 

/**
 * 更新用户的生命周期状态（如在线/离线）和最后活跃时间。
 * @param {string} userId - 要更新状态的用户ID。
 * @param {string} newStatus - 新的状态字符串（如 'online', 'offline'）。
 */
export const updateUserLifecycle = async (userId, newStatus) => {
  // 使用 updateOne 和 $set 更新用户状态，upsert: true 表示如果用户不存在则创建
  await User.updateOne(
    { _id: userId }, // Mongoose 中通常用 _id
    { $set: { 
        status: newStatus, 
        lastActive: new Date() 
    }},
    { upsert: true } // 如果找不到匹配的文档，则创建一个新文档
  );
};

/**
 * 检查用户是否还可以提问（状态机逻辑示例）。
 * @param {string} userId - 用户ID。
 * @returns {Promise<boolean>} - 如果用户当天提问次数未达上限，返回 true，否则返回 false。
 */
export const canAskQuestion = async (userId) => {
  const user = await User.findOne({ _id: userId });
  // 假设 User 模型有 dailyQueries 字段
  return user && user.dailyQueries < MAX_DAILY_QUERIES;
};

/**
 * 增加用户的每日提问次数。
 * @param {string} userId - 用户ID。
 */
export const incrementDailyQueries = async (userId) => {
  // 使用 $inc 原子操作符来增加 dailyQueries 字段的值
  await User.updateOne(
    { _id: userId },
    { $inc: { dailyQueries: 1 } }
  );
};

/**
 * 获取指定用户的完整状态信息。
 * @param {string} userId - 用户ID。
 * @returns {Promise<object|null>} - 返回用户文档对象，如果找不到则返回 null。
 */
export const getUserStatus = async (userId) => {
  return await User.findOne({ _id: userId });
};