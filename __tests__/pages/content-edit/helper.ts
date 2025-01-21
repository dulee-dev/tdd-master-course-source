import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page } from '@playwright/test';

export class Helper extends BaseHelper {
  readonly getForm: Locator;
  readonly getTitle: Locator;
  readonly getBody: Locator;
  readonly getThumbnail: Locator;
  readonly getThumbnailSrc: Locator;
  readonly getSumbit: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);

    this.getTitle = this.page.getByLabel('title');
    this.getForm = this.page.getByRole('form');
    this.getBody = this.page.getByLabel('body');
    this.getThumbnail = this.page.getByLabel('thumbnail');
    this.getThumbnailSrc = this.page.getByAltText('thumbnail');
    this.getSumbit = this.page.getByRole('button', { name: '수정하기' });
  }

  getUrl(id: string) {
    return `/contents/${id}/edit`;
  }

  async gotoTargetPage(id: string) {
    const url = this.getUrl(id);
    await this.page.goto(url);
  }

  async fillForm({
    title,
    body,
    fileName,
  }: {
    title?: string;
    body?: string;
    fileName?: string;
  }) {
    if (title) await this.getTitle.fill(title);
    if (body) await this.getBody.fill(body);
    if (fileName) {
      const setFile = this.uploadFile();
      await this.getThumbnail.evaluate((el: HTMLInputElement) => el.click());
      await setFile(fileName);
    }
  }
}
