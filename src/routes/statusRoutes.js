import { Hono } from 'hono';
import { updateUserLifecycle, canAskQuestion } from '../services/statusService.js';

// 初始化 Hono 实例用于状态管理路由
const statusRoute = new Hono();

// 定义 POST /update 接口，用于更新用户状态
statusRoute.post('/update', async (c) => {
  // 从上下文中获取用户信息
  const user = c.get('user');
  // 从请求体中获取新状态
  const { newStatus } = await c.req.json();

  // 调用服务层函数更新数据库
  await updateUserLifecycle(user.id, newStatus);
  // 返回成功响应
  return c.json({ message: 'User status updated successfully' });
});

// 定义 GET /can-ask 接口，用于检查用户是否可以提问
statusRoute.get('/can-ask', async (c) => {
  // 从上下文中获取用户信息
  const user = c.get('user');
  // 调用服务层函数检查提问权限
  const canAsk = await canAskQuestion(user.id);

  // 返回检查结果
  return c.json({ canAsk });
});

export default statusRoute;