import mongoose from "mongoose";
const { Schema, model } = mongoose;

// 用户集合 Schema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true }, // 用户名，唯一
  passwordHash: { type: String, required: true },           // 加密后的密码
  email: { type: String, unique: true, required: true },    // 邮箱，唯一
  createdAt: { type: Date, default: Date.now }              // 创建时间
});
export const User = model("User", userSchema);

// 消息集合 Schema
const messageSchema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, required: true }, // 会话ID
  userId: { type: Schema.Types.ObjectId, required: true },    // 用户ID
  role: { type: String, enum: ["user", "assistant"], required: true }, // 消息角色
  content: String,                                            // 消息内容
  model: String,                                              // 使用的AI模型
  promptTokens: Number,                                       // 提示词token数
  completionTokens: Number,                                   // 响应token数
  timestamp: { type: Date, default: Date.now }                // 时间戳
});
export const Message = model("Message", messageSchema);

// 提示模板集合 Schema
const promptTemplateSchema = new Schema({
  name: { type: String, required: true },     // 模板名称
  systemPrompt: String,                       // 系统角色设定文本
  contextRules: [String],                     // 上下文处理规则
  maxTokens: Number,                          // 最大token限制
  temperature: Number                         // 生成温度参数
});
export const PromptTemplate = model("PromptTemplate", promptTemplateSchema);

// API密钥集合 Schema
const apiKeySchema = new Schema({
  service: { type: String, enum: ["openai", "anthropic", "gemini"], required: true }, // 服务商
  keyHash: { type: String, required: true },      // 加密后的API密钥
  usage: {                                        // 使用统计
    monthCalls: Number,                           // 月调用次数
    monthTokens: Number                           // 月token消耗
  }
});
export const ApiKey = model("ApiKey", apiKeySchema);

// 审计日志集合 Schema
const auditLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, default: null }, // 操作用户ID（系统操作为null）
  action: { type: String, enum: ["login", "query", "status_update", "error"], required: true }, // 操作类型
  details: Schema.Types.Mixed,                            // 操作详情
  ipAddress: String,                                      // 客户端IP
  timestamp: { type: Date, default: Date.now }            // 时间戳
});
export const AuditLog = model("AuditLog", auditLogSchema);

