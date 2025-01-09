import { delayMiddleware } from '../middleware/delay-middleware';
import { contentHandlers } from './content-handler';

export const mswHandler = [delayMiddleware, ...contentHandlers];
