// Hono主入口文件，负责初始化应用、注册中间件和路由

import { Hono } from 'hono';
import authMiddleware from './middleware/auth.js'; // 引入鉴权中间件
import qaRoutes from './routes/qaRoutes.js';       // 引入问答服务路由
import statusRoutes from './routes/statusRoutes.js'; // 引入状态管理路由

// 初始化 Hono 应用实例
const app = new Hono();

// 注册全局中间件
// app.use('*', authMiddleware) 会对所有路径的请求应用鉴权
app.use('*', authMiddleware);

// 注册模块化路由
// app.route(path, handler) 可以将一个路径下的所有请求委托给另一个 Hono 实例处理
app.route('/status', statusRoutes);    // 将 /status/* 的请求交给 statusRoutes 处理
app.route('/qa', qaRoutes);        // 将 /qa/* 的请求交给 qaRoutes 处理

// 导出 app 实例，用于服务器启动文件（如 index.js 或 server.js）
export default app;