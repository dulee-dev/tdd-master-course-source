import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { guardTest, headerTest } from '@__tests__/playwright/shared-test';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { imgFileName } from '@__tests__/fixtures/file-name';
import { faker } from '@faker-js/faker';
import { contentCreated } from '@__tests__/fixtures/content-fixture';
import { uuidGlobalRegExp, uuidRegExp } from '@__tests__/libs/reg-exp';

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
    test.beforeEach(async ({ page, context }) => {
      const helper = new Helper(page, context);
      const user = userFixtures[0];

      await helper.signIn(user.nickname);
      await helper.gotoTargetPage();
    });

    test.describe('input image', () => {
      test('if select image file, thumbnail preview src is changed', async ({
        page,
        context,
      }) => {
        const helper = new Helper(page, context);

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

    test.describe('validation', () => {
      test('if title length 81, submit disabled', async ({ page, context }) => {
        const title = faker.string.sample(81);

        const helper = new Helper(page, context);
        await helper.setUpValidation();
        await helper.fillForm({
          title,
        });
        await expect(helper.getSumbit).toBeDisabled();
      });

      test('if title length 1, submit disabled', async ({ page, context }) => {
        const title = faker.string.sample(1);

        const helper = new Helper(page, context);
        await helper.setUpValidation();
        await helper.fillForm({
          title,
        });
        await expect(helper.getSumbit).toBeDisabled();
      });

      test('if body length 20001, submit disabled', async ({
        page,
        context,
      }) => {
        const body = faker.string.sample(20001);

        const helper = new Helper(page, context);
        await helper.setUpValidation();
        await helper.fillForm({
          body,
        });
        await expect(helper.getSumbit).toBeDisabled();
      });

      test('if thumbnail not selected, submit disabled', async ({
        page,
        context,
      }) => {
        const title = faker.string.sample(2);

        const helper = new Helper(page, context);
        await helper.fillForm({
          title,
        });
        await page.waitForTimeout(2000);
        await expect(helper.getSumbit).toBeDisabled();
      });
    });

    test('if ok, redirect to created content detail page', async ({
      page,
      context,
    }) => {
      const helper = new Helper(page, context);
      const created = contentCreated;

      const title = created.title;
      const body = created.body;
      const fileName = imgFileName;

      await helper.fillForm({
        title,
        body,
        fileName,
      });
      await helper.getSumbit.click();

      const url = new RegExp(
        helper.baseUrl + `/contents/${uuidGlobalRegExp.source}`
      );
      await expect(page).toHaveURL(url);
      await expect(page.getByText(title)).toBeVisible();
    });
  });
});
