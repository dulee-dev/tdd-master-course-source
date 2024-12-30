import { setupServer } from 'msw/node';
import { mswHandler } from './handlers/index';

export const mockServer = setupServer(...mswHandler);
