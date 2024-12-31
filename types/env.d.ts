/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_WEB_BASE_URL: string;
    NEXT_PUBLIC_API_BASE_URL: string;
  }
}
