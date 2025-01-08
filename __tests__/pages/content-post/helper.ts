import { imgFileName } from '@__tests__/fixtures/file-name';
import { BaseHelper } from '@__tests__/playwright/base-helper';
import { faker } from '@faker-js/faker';
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

  async setUpValidation() {
    const title = faker.string.sample(2);
    const fileName = imgFileName;

    await this.fillForm({
      title,
      fileName,
    });
    await expect(this.getSumbit).toBeEnabled();
  }
}
