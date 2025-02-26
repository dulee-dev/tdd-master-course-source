import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { guardTest, headerTest } from '@__tests__/playwright/shared-test';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { imgFileName } from '@__tests__/fixtures/file-name';
import { faker } from '@faker-js/faker';
import { gen } from '@__tests__/generator';
import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { localizeDate } from '@/libs/sub-string';
import { checkIsMock } from '@__tests__/libs/check-is-mock';

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

    test.describe('input image', () => {
      test('if select image file, thumbnail preview src is changed', async ({
        page,
        context,
      }) => {
        const content = contentFixtures[0];
        const user = userFixtures[0];
        const helper = new Helper(page, context);

        await helper.signIn(user.nickname);
        await helper.gotoTargetPage(content.id);

        await expect(helper.getThumbnailSrc).toHaveAttribute(
          'src',
          content.thumbnail
        );
        const setFile = helper.uploadFile();
        await helper.getThumbnail.evaluate((el: HTMLInputElement) =>
          el.click()
        );
        await setFile(imgFileName);

        await expect(helper.getThumbnailSrc).not.toHaveAttribute(
          'src',
          content.thumbnail
        );
      });
    });

    test.describe('validation', () => {
      const content = contentFixtures[0];
      const user = userFixtures[0];

      test.beforeEach(
        'sign-in and visit content edit page',
        async ({ page, context }) => {
          const helper = new Helper(page, context);

          await helper.signIn(user.nickname);
          await helper.gotoTargetPage(content.id);
        }
      );

      test('if title length 81, submit disabled', async ({ page, context }) => {
        const title = faker.string.sample(81);

        const helper = new Helper(page, context);
        await helper.fillForm({
          body: gen.content.body(),
        });
        await expect(helper.getSumbit).toBeEnabled();

        await helper.fillForm({
          title,
        });
        await expect(helper.getSumbit).toBeDisabled();
      });

      test('if title length 1, submit disabled', async ({ page, context }) => {
        const title = faker.string.sample(1);

        const helper = new Helper(page, context);
        await helper.fillForm({
          body: gen.content.body(),
        });
        await expect(helper.getSumbit).toBeEnabled();

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
        await helper.fillForm({
          title: gen.content.title(),
        });
        await expect(helper.getSumbit).toBeEnabled();

        await helper.fillForm({
          body,
        });
        await expect(helper.getSumbit).toBeDisabled();
      });

      test('if no values are changed, submit disabled', async ({
        page,
        context,
      }) => {
        const title = faker.string.sample(2);

        const helper = new Helper(page, context);
        await helper.fillForm({
          title,
        });
        await expect(helper.getSumbit).toBeEnabled();

        await helper.fillForm({
          title: content.title,
        });
        await expect(helper.getSumbit).toBeDisabled();
      });
    });
  });

  test('if edit ok, original data is changed', async ({ page, context }) => {
    const content = contentFixtures[0];
    const user = userFixtures[0];
    const title = gen.content.title();
    const body = gen.content.body();
    const fileName = imgFileName;

    const helper = new Helper(page, context);

    await helper.signIn(user.nickname);
    await helper.gotoTargetPage(content.id);
    await helper.fillForm({
      title,
      body,
      fileName,
    });
    await expect(helper.getSumbit).toBeEnabled();

    if (!checkIsMock()) return;

    await helper.getSumbit.click();

    await helper.strictHaveUrl(`/contents/${content.id}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);

    await helper.resetVirtualFixtures();
  });
});
