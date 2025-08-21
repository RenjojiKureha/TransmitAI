import { UserState } from '../models/userModel.js';

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