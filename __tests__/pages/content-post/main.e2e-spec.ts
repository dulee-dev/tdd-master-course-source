import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { guardTest, headerTest } from '@__tests__/playwright/shared-test';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { imgFileName } from '@__tests__/fixtures/file-name';

test.describe('content-post page', () => {
  const url = '/contents/post';
  const redirectUrl = '/users/sign-in';

  test.describe('guard', () => {
    guardTest.private(url, redirectUrl);
  });

  test.describe('header', () => {
    headerTest.signIn(url);
  });

  test.describe('form', () => {
    test.describe('input image', () => {
      test('if select image file, thumbnail preview src is changed', async ({
        page,
        context,
      }) => {
        const helper = new Helper(page, context);
        const user = userFixtures[0];

        await helper.signIn(user.nickname);
        await helper.gotoTargetPage();

        const setFile = helper.uploadFile();
        await helper.getThumbnail.evaluate((el: HTMLInputElement) =>
          el.click()
        );
        await setFile(imgFileName);

        await expect(helper.getThumbnailSrc).not.toHaveAttribute(
          'src',
          '/file.svg'
        );
      });
    });
  });
});
