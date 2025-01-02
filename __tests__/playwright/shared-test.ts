import { test, expect } from '@playwright/test';
import { BaseHelper } from './base-helper';
import { userFixtures } from '@__tests__/fixtures/user-fixture';

export const headerTest = (url: string) => {
  test('if not sign-in, "로그인" link is visible', async ({ page }) => {
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByRole('link', { name: '로그인' })
    ).toBeVisible();
  });

  test('if sign-in, "user-menu" is visible', async ({ page, context }) => {
    const helper = new BaseHelper(page, context);
    const user = userFixtures[0];

    await helper.signIn(user.nickname);
    await page.goto(url);
    await expect(
      page.getByTestId('header').getByRole('button', { name: 'user-menu' })
    ).toBeVisible();
  });
};
