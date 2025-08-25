import { Hono } from 'hono';
import { askQuestion } from '../services/qaService.js';

const qaRoute = new Hono();

qaRoute.post('/ask', askQuestion);

export default qaRoute;