import {
  BrowserContext,
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

export class BaseHelper {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly baseUrl: string;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.baseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL;
  }

  async signIn(authorization: string) {
    await this.context.addCookies([
      {
        name: 'authorization',
        value: authorization,
        url: this.baseUrl,
      },
    ]);
  }

  async strictHaveUrl(relative: string) {
    const absolute = this.baseUrl + relative;
    await expect(this.page).toHaveURL(absolute);
  }
}
