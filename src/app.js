// Hono主入口

import { Hono } from 'hono';
import authMiddleware from './utils/auth.js';
import questionRoute from './controllers/question.js';

const app = new Hono();

// 全局鉴权中间件
app.use('*', authMiddleware);

// 模块路由
app.route('/status', statusRoute);    // 用户状态管理
app.route('/qa', questionRoute);       // 问答服务

export default app;