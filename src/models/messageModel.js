import mongoose from "mongoose";
const { Schema, model } = mongoose;

// 定义消息数据结构 (Schema)
const messageSchema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true }, // 关联的会话ID
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },       // 关联的用户ID
  role: { type: String, enum: ["user", "assistant"], required: true },        // 消息发送者角色：用户或AI助手
  content: { type: String, required: true },                                  // 消息的具体内容
  model: { type: String, required: true },                                    // 生成该消息所使用的AI模型名称
  promptTokens: { type: Number, required: true },                             // 消耗的提示词 token 数量
  completionTokens: { type: Number, required: true },                         // 消耗的生成内容 token 数量
  timestamp: { type: Date, default: Date.now }                                // 消息创建时间戳
});

// 根据 Schema 创建并导出 Message 模型
export const Message = model("Message", messageSchema);