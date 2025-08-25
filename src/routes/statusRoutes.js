import { Hono } from 'hono';
import { updateUserLifecycle, canAskQuestion } from '../services/statusService.js';

const statusRoute = new Hono();

statusRoute.post('/update', async (c) => {
  const user = c.get('user');
  const { newStatus } = await c.req.json();

  await updateUserLifecycle(user.id, newStatus);
  return c.json({ message: 'User status updated successfully' });
});

statusRoute.get('/can-ask', async (c) => {
  const user = c.get('user');
  const canAsk = await canAskQuestion(user.id);

  return c.json({ canAsk });
});

export default statusRoute;