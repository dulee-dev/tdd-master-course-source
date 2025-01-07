import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { guardTest, headerTest } from '@__tests__/playwright/shared-test';
import { BaseHelper } from '@__tests__/playwright/base-helper';
import { userFixtures } from '@__tests__/fixtures/user-fixture';

test.describe('content-post page', () => {
  const url = '/contents/post';
  const redirectUrl = '/users/sign-in';

  test.describe('guard', () => {
    guardTest.notSignIn(url, redirectUrl);
    guardTest.signIn(url);
  });

  test.describe('header', () => {
    headerTest.signIn(url);
  });

  test.describe('form', () => {
    test('if select image file, thumbnail preview src is changed', async ({
      page,
      context,
    }) => {
      const helper = new Helper(page, context);
    });
  });
});
