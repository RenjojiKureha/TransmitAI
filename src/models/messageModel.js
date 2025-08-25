import mongoose from "mongoose";
const { Schema, model } = mongoose;

// 消息集合 Schema
const messageSchema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, required: true }, // 会话ID
  userId: { type: Schema.Types.ObjectId, required: true },    // 用户ID
  role: { type: String, enum: ["user", "assistant"], required: true }, // 消息角色
  content: { type: String, required: true },                  // 消息内容
  model: { type: String, required: true },                    // 使用的AI模型
  promptTokens: { type: Number, required: true },             // 提示词token数
  completionTokens: { type: Number, required: true },         // 响应token数
  timestamp: { type: Date, default: Date.now }                // 时间戳
});

export const Message = model("Message", messageSchema);