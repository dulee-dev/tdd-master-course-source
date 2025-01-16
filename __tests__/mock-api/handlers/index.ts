import { delayMiddleware } from '../middleware/delay-middleware';
import { contentHandlers } from './content-handler';
import { virtualHandlers } from './virtual-handler';

export const mswHandler = [
  delayMiddleware,
  ...virtualHandlers,
  ...contentHandlers,
];
