import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page, expect } from '@playwright/test';

export class Helper extends BaseHelper {
  url = '/contents/post';
  readonly getTitle: Locator;
  readonly getBody: Locator;
  readonly getThumbnail: Locator;
  readonly getThumbnailSrc: Locator;
  readonly getSumbit: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);

    this.getTitle = this.page.getByLabel('title');
    this.getBody = this.page.getByLabel('body');
    this.getThumbnail = this.page.getByLabel('thumbnail');
    this.getThumbnailSrc = this.page.getByAltText('thumbnail');
    this.getSumbit = this.page.getByRole('button', { name: '생성하기' });
  }

  async gotoTargetPage() {
    await this.page.goto(this.url);
  }
}
