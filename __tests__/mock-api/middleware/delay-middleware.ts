import { delay, http } from 'msw';

export const delayMiddleware = http.all('*', async () => {
  await delay(100);
});
