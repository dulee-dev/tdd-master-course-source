import { userFixtures } from '@__tests__/fixtures/content-fixture';
import { contentFixtures } from '@__tests__/fixtures/user-fixture';
import { BaseHelper } from '@__tests__/playwright/base-helper';
import { test, expect } from '@playwright/test';

const getUrl = (id: string): string => `/contents/${id}`;

test.describe('header', () => {
  test('if not sign-in, "로그인" link is visible', async ({ page }) => {
    const content = contentFixtures[0];

    const url = getUrl(content.id);
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByRole('link', { name: '로그인' })
    ).toBeVisible();
  });

  test('if sign-in, "user-menu" is visible', async ({ page, context }) => {
    const helper = new BaseHelper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];
    const url = getUrl(content.id);

    await helper.signIn(user.nickname);
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByRole('button', { name: 'user-menu' })
    ).toBeVisible();
  });

  test('if visit, "{작성자}님 블로그" is visible', async ({
    page,
    context,
  }) => {
    const content = contentFixtures[0];
    const user = userFixtures[0];

    const url = getUrl(content.id);
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByText(`${user.nickname}님 블로그`)
    ).toBeVisible();
  });
});
