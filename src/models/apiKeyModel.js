import mongoose from "mongoose";

// 定义 API 密钥数据结构 (Schema)
const apiKeySchema = new mongoose.Schema({
  service: { 
    type: String, 
    enum: ["openai", "anthropic", "gemini"], // 枚举，限定服务的类型
    required: true 
  },
  keyHash: { type: String, required: true },      // 存储加密（哈希）后的API密钥，避免明文存储
  usage: {                                        // 密钥使用情况统计
    monthCalls: { type: Number, default: 0 },     // 本月累计调用次数
    monthTokens: { type: Number, default: 0 }     // 本月累计消耗的 token 数量
  }
});

// 根据 Schema 创建并导出 ApiKey 模型
export const ApiKey = mongoose.model("ApiKey", apiKeySchema);