import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page, expect } from '@playwright/test';

export class Helper extends BaseHelper {
  readonly getMain: Locator;
  readonly getAuthorAside: Locator;
  readonly getCommentSection: Locator;
  readonly getEditBtn: Locator;
  readonly getDeleteBtn: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getMain = page.getByRole('main');
    this.getAuthorAside = page.getByTestId('author-aside');
    this.getCommentSection = page.getByTestId('comment-section');
    this.getEditBtn = page.getByRole('link', { name: '수정', exact: true });
    this.getDeleteBtn = page.getByRole('button', { name: '삭제', exact: true });
  }

  getUrl(id: string): string {
    return `/contents/${id}`;
  }

  async gotoTargetPage(id: string) {
    const url = this.getUrl(id);
    await this.page.goto(url);
  }
}
