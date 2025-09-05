// JWT 鉴权中间件，用于保护路由

import jwt from 'jsonwebtoken';

/**
 * Hono 中间件，用于验证请求头中的 JWT (JSON Web Token)。
 * @param {object} c - Hono 的上下文对象，包含请求和响应信息。
 * @param {function} next - 调用下一个中间件或路由处理程序的函数。
 * @returns {Promise<Response|void>} 如果鉴权失败，返回 JSON 错误响应；成功则调用 next()。
 */
export default async (c, next) => {
  // 从 Authorization 请求头中获取 token
  // 格式通常为 "Bearer <token>"
  const token = c.req.header('Authorization')?.split(' ')[1];

  // 如果没有 token，返回 401 Unauthorized 错误
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  try {
    // 使用环境变量中的 JWT_SECRET 验证 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 将解码后的用户信息（payload）注入到当前请求的上下文中，方便后续处理函数使用
    c.set('user', decoded);
    // 调用 next() 将控制权交给下一个中间件或路由处理程序
    await next();
  } catch (err) {
    // 如果 token 无效（如过期、签名错误），返回 403 Forbidden 错误
    return c.json({ error: 'Invalid token' }, 403);
  }
};