import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { guardTest, headerTest } from '@__tests__/playwright/shared-test';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { imgFileName } from '@__tests__/fixtures/file-name';
import { faker } from '@faker-js/faker';
import { uuidGlobalRegExp } from '@__tests__/libs/reg-exp';
import { gen } from '@__tests__/generator';
import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { localizeDate } from '@/libs/sub-string';

test.describe('content edit page', () => {
  const getUrl = (id: string) => `/contents/${id}/edit`;

  test.describe('guard', () => {
    const content = contentFixtures[0];
    const redirectUrl = '/users/sign-in';
    const url = getUrl(content.id);

    guardTest.private(url, redirectUrl);

    test('if content not found, redirect to "/contents"', async ({
      page,
      context,
    }) => {
      const user = userFixtures[0];
      const id = faker.string.uuid();

      const helper = new Helper(page, context);
      await helper.signIn(user.nickname);
      await helper.gotoTargetPage(id);
      await helper.strictHaveUrl('/contents');
    });

    test('if content exist but not author, redirect to "/contents"', async ({
      page,
      context,
    }) => {
      const content = contentFixtures[0];
      const user = userFixtures[1];

      const helper = new Helper(page, context);
      await helper.signIn(user.nickname);
      await helper.gotoTargetPage(content.id);
      await helper.strictHaveUrl('/contents');
    });
  });

  test.describe('header', () => {
    const content = contentFixtures[0];
    const url = getUrl(content.id);
    headerTest.signIn(url);

    test('if visit, "{작성자}님 블로그" is visible', async ({
      page,
      context,
    }) => {
      const content = contentFixtures[0];
      const user = userFixtures[0];
      const helper = new Helper(page, context);

      await helper.signIn(user.nickname);
      await helper.gotoTargetPage(content.id);
      await expect(
        page.getByTestId('header').getByText(`${user.nickname}님 블로그`)
      ).toBeVisible();
    });
  });

  test.describe('form', () => {
    test('initial status', async ({ page, context }) => {
      const content = contentFixtures[0];
      const user = userFixtures[0];
      const helper = new Helper(page, context);

      await helper.signIn(user.nickname);
      await helper.gotoTargetPage(content.id);

      await expect(helper.getTitle).toHaveText(content.title);
      await expect(helper.getBody).toHaveText(content.body);
      await expect(helper.getThumbnailSrc).toHaveAttribute(
        'src',
        content.thumbnail
      );
      await expect(helper.getForm).toContainText(user.nickname);
      await expect(helper.getForm).toContainText(
        localizeDate(content.createdAt)
      );
    });
  });
});
