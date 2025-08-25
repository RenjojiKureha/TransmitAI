import mongoose from "mongoose";

const { Schema, model } = mongoose;

// 提示模板集合 Schema
const promptTemplateSchema = new Schema({
  name: { type: String, required: true },     // 模板名称
  systemPrompt: String,                       // 系统角色设定文本
  contextRules: [String],                     // 上下文处理规则
  maxTokens: Number,                          // 最大token限制
  temperature: Number                         // 生成温度参数
});

export const PromptTemplate = model("PromptTemplate", promptTemplateSchema);