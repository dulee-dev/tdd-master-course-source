import { BaseHelper } from '@__tests__/playwright/base-helper';
import { BrowserContext, Locator, Page, expect } from '@playwright/test';

export class Helper extends BaseHelper {
  url = '/contents';

  readonly getPagination: Locator;
  readonly getContentItems: Locator;

  readonly getSearchInput: Locator;
  readonly getSortOption: Locator;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.getPagination = this.page.getByTestId('pagination');
    this.getContentItems = this.page.getByTestId('content-item');
    this.getSearchInput = this.page.getByRole('textbox', { name: 'search' });
    this.getSortOption = this.page.getByLabel('sort');
  }

  async gotoTargetPage(assert: boolean) {
    await this.page.goto(this.url);
    if (assert) await this.strictHaveUrl(this.url);
  }

  getPageButton(num: number) {
    return this.getPagination.getByRole('button', { name: num + '' });
  }
}
