import { test, expect } from '@playwright/test';
import { contentFixtures } from './fixtures/content-fixture';

test('tempt', async ({ page, context }) => {
  const contents = contentFixtures.toSorted((a, b) =>
    a.createAt > b.createAt ? -1 : 1
  );

  await page.goto('/contents');

  const titleOld = await page
    .getByTestId('content-item')
    .first()
    .getByRole('heading')
    .innerText();

  await page.getByRole('button', { name: '2', exact: true }).click();

  await expect(page.getByTestId('content-item').first()).not.toContainText(
    titleOld
  );
  await page.getByTestId('content-item').first().click();

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    contents[12].title
  );
});
