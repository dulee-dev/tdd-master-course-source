import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { guardTest, headerTest } from '@__tests__/playwright/shared-test';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { imgFileName } from '@__tests__/fixtures/file-name';
import { faker } from '@faker-js/faker';
import { uuidGlobalRegExp } from '@__tests__/libs/reg-exp';
import { gen } from '@__tests__/generator';
import { contentFixtures } from '@__tests__/fixtures/content-fixture';

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
});
