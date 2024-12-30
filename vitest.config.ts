/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... Specify options here.
    include: [
      '**/*.{test,spec}.?(c|m)[jt]s?(x)',
      '**/*.effect-{test,spec}.?(c|m)[jt]s?(x)',
    ],
  },
});
