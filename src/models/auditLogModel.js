import mongoose from "mongoose";
const { Schema, model } = mongoose;

// 定义审计日志数据结构 (Schema)
const auditLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // 操作关联的用户ID，系统级操作可为 null
  action: { 
    type: String, 
    enum: ["login", "query", "status_update", "error"], // 枚举，定义了可记录的操作类型
    required: true 
  },
  details: Schema.Types.Mixed,                            // 存储与操作相关的任意详细信息（如错误堆栈、请求参数等）
  ipAddress: String,                                      // 发起操作的客户端IP地址
  timestamp: { type: Date, default: Date.now }            // 日志记录时间戳
});

// 根据 Schema 创建并导出 AuditLog 模型
export const AuditLog = model("AuditLog", auditLogSchema);