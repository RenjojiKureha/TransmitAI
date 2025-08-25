// Hono主入口

import { Hono } from 'hono';
import authMiddleware from './middleware/auth.js';
import qaRoutes from './routes/qaRoutes.js';
import statusRoutes from './routes/statusRoutes.js';

const app = new Hono();

// 全局鉴权中间件
app.use('*', authMiddleware);

// 模块路由
app.route('/status', statusRoutes);    // 用户状态管理
app.route('/qa', qaRoutes);        // 问答服务

export default app;