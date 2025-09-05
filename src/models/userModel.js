import mongoose from "mongoose";
const { Schema, model } = mongoose;

// 定义用户数据结构 (Schema)
const userSchema = new Schema({
  username: { type: String, unique: true, required: true }, // 用户名，必须唯一
  passwordHash: { type: String, required: true },           // 经过哈希加密的密码
  email: { type: String, unique: true, required: true },    // 电子邮箱，必须唯一
  createdAt: { type: Date, default: Date.now },             // 文档创建时间，默认为当前时间
  status: { type: String, default: 'offline' },             // 用户在线状态，如 'online', 'offline'
  lastActive: { type: Date, default: Date.now }             // 用户最后活跃时间
  // 可以在这里添加 dailyQueries 等字段
  // dailyQueries: { type: Number, default: 0 }
});

// 根据 Schema 创建并导出 User 模型
export const User = model("User", userSchema);