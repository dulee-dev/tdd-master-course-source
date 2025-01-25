import { imgFileName } from '@__tests__/fixtures/file-name';
import {
  BrowserContext,
  expect,
  type Locator,
  type Page,
} from '@playwright/test';
import path from 'path';

export class BaseHelper {
  readonly page: Page;
  readonly context: BrowserContext;
  readonly baseUrl: string;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.baseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL;
  }

  async resetVirtualFixtures() {
    await this.page.getByRole('button', { name: 'reset' }).click();
    await expect(this.page.getByText('reset fixture success')).toBeVisible();
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

  uploadFile() {
    const fileChooserPromise = this.page.waitForEvent('filechooser');

    const setFile = async (fileName: string) => {
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(path.join('__tests__', 'fixtures', fileName));
    };

    return setFile;
  }

  async strictHaveUrl(relative: string) {
    const reg = new RegExp(`^${this.baseUrl}${relative}$`);
    await expect(this.page).toHaveURL(reg);
  }
}
