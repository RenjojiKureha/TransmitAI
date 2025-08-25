import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  service: { type: String, enum: ["openai", "anthropic", "gemini"], required: true }, // 服务商
  keyHash: { type: String, required: true },      // 加密后的API密钥
  usage: {                                        // 使用统计
    monthCalls: { type: Number, default: 0 },    // 月调用次数
    monthTokens: { type: Number, default: 0 }     // 月token消耗
  }
});

export const ApiKey = mongoose.model("ApiKey", apiKeySchema);