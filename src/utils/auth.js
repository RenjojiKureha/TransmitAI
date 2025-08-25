// 鉴权中间件

import jwt from 'jsonwebtoken';

export default async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];
  if (!token) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    c.set('user', decoded); // 注入用户信息到请求上下文
    await next();
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 403);
  }
};