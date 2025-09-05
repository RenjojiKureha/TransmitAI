import { Hono } from 'hono';
// 这里的 askQuestion 实际上是整个 Hono 实例，我们直接用它
import questionController from '../controllers/question.js';

// 初始化 Hono 实例作为问答服务的根路由
const qaRoute = new Hono();

// 将所有 /ask 的请求（这里是 POST）委托给 questionController 处理
// 因为 questionController 内部已经定义了 .post('/ask', ...)
// 所以这里直接使用 route 方法
qaRoute.route('/ask', questionController);

export default qaRoute;