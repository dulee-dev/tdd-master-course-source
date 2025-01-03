import { headerTest } from '@__tests__/playwright/shared-test';
import { test, expect } from '@playwright/test';
import { Helper } from './helper';

const url = '/contents';

test.describe('header', () => {
  headerTest(url);
});

test.describe('init', () => {});

test.describe('sort', () => {});

test.describe('search', () => {});

test.describe('pagination', () => {
  test('if 14 items are exist, has 2 buttons and 2 items', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);

    await helper.gotoTargetPage(false);

    await test.step('page 3 is invisible and page 2 is visible', async () => {
      await expect(helper.getPageButton(3)).toBeHidden();
      await expect(helper.getPageButton(2)).toBeVisible();
    });

    await test.step('if click page 2, 2 items are visible', async () => {
      await helper.getPageButton(2).click();
      await expect(helper.getContentItems).toHaveCount(2);
    });
  });
});
