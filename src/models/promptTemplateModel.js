import mongoose from "mongoose";
const { Schema, model } = mongoose;

// 定义 Prompt 模板数据结构 (Schema)
const promptTemplateSchema = new Schema({
  name: { type: String, required: true, unique: true }, // 模板的唯一名称
  systemPrompt: String,                                 // 系统级提示，用于设定AI的角色和行为
  contextRules: [String],                               // 定义如何处理上下文的规则列表
  maxTokens: Number,                                    // 调用模型时建议的最大 token 限制
  temperature: Number                                   // 调用模型时建议的温度参数（控制创造性）
});

// 根据 Schema 创建并导出 PromptTemplate 模型
export const PromptTemplate = model("PromptTemplate", promptTemplateSchema);