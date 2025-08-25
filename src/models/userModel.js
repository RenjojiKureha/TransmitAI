import mongoose from "mongoose";
const { Schema, model } = mongoose;

// 用户集合 Schema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true }, // 用户名，唯一
  passwordHash: { type: String, required: true },           // 加密后的密码
  email: { type: String, unique: true, required: true },    // 邮箱，唯一
  createdAt: { type: Date, default: Date.now },              // 创建时间
  status: { type: String, default: 'offline' },              // 用户状态
  lastActive: { type: Date, default: Date.now }              // 最后活跃时间
});

export const User = model("User", userSchema);