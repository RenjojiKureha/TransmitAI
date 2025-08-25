import mongoose from "mongoose";

const { Schema, model } = mongoose;

// 审计日志集合 Schema
const auditLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, default: null }, // 操作用户ID（系统操作为null）
  action: { type: String, enum: ["login", "query", "status_update", "error"], required: true }, // 操作类型
  details: Schema.Types.Mixed,                            // 操作详情
  ipAddress: String,                                      // 客户端IP
  timestamp: { type: Date, default: Date.now }            // 时间戳
});

export const AuditLog = model("AuditLog", auditLogSchema);