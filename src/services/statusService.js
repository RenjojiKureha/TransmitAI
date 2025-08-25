// 用户状态管理

import { UserState } from '../models/userModel.js';

// const MAX_DAILY_QUERIES = 10; // 每日最大提问次数

// 更新用户生命状态（示例：登录时更新状态）
export const updateUserLifecycle = async (userId, newStatus) => {
  await UserState.updateOne(
    { userId },
    { $set: { 
        status: newStatus, 
        lastActive: new Date() 
    }},
    { upsert: true }
  );
};

// 状态机示例（限制每日提问次数）
export const canAskQuestion = async (userId) => {
  const state = await UserState.findOne({ userId });
  return state.dailyQueries < MAX_DAILY_QUERIES;
};

// 更新每日提问次数
export const incrementDailyQueries = async (userId) => {
  await UserState.updateOne(
    { userId },
    { $inc: { dailyQueries: 1 } }
  );
};

// 获取用户状态
export const getUserStatus = async (userId) => {
  return await UserState.findOne({ userId });
};