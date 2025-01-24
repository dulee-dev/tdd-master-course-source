import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { test, expect } from '@playwright/test';
import { Helper } from './helper';
import { faker } from '@faker-js/faker';
import { headerTest } from '@__tests__/playwright/shared-test';
import { localizeDate } from '@/libs/sub-string';
import { checkIsMock } from '@__tests__/libs/check-is-mock';

const getUrl = (id: string): string => `/contents/${id}`;

test.describe('guard', () => {
  test('if content not found, redirect to "/contents"', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);

    const id = faker.string.uuid();

    await helper.gotoTargetPage(id);
    await helper.strictHaveUrl('/contents');
  });
});

test.describe('header', () => {
  const content = contentFixtures[0];
  const url = getUrl(content.id);
  headerTest.notSignIn(url);
  headerTest.signIn(url);

  test('if visit, "{작성자}님 블로그" is visible', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];

    await helper.gotoTargetPage(content.id);
    await expect(
      page.getByTestId('header').getByText(`${user.nickname}님 블로그`)
    ).toBeVisible();
  });
});

test.describe('main', () => {
  test('if visit, fetch ok', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];

    await helper.gotoTargetPage(content.id);

    await expect(helper.getMain.getByText(content.title)).toBeVisible();
    await expect(helper.getMain.getByText(user.nickname)).toBeVisible();
    await expect(
      helper.getMain.getByText(localizeDate(content.createdAt))
    ).toBeVisible();
    await expect(helper.getMain.getByText(content.body)).toBeVisible();
  });

  test.describe('author action btns', () => {
    test('if not sign-in, btns are invisible', async ({ page, context }) => {
      const content = contentFixtures[0];

      const helper = new Helper(page, context);
      await helper.gotoTargetPage(content.id);
      await expect(helper.getEditBtn).toBeHidden();
    });

    test('if sign-in but not author, btns are invisible', async ({
      page,
      context,
    }) => {
      const content = contentFixtures[0];
      const user = userFixtures[1];

      const helper = new Helper(page, context);
      await helper.signIn(user.nickname);
      await helper.gotoTargetPage(content.id);
      await expect(helper.getEditBtn).toBeHidden();
    });

    test('if click delete btn, redirect to "/contents" and deleted content is not found', async ({
      page,
      context,
    }) => {
      const content = contentFixtures[0];
      const user = userFixtures[0];

      const helper = new Helper(page, context);
      await helper.signIn(user.nickname);
      await helper.gotoTargetPage(content.id);
      await expect(helper.getDeleteBtn).toBeVisible();

      if (!checkIsMock()) return;

      await helper.getDeleteBtn.click();
      await helper.strictHaveUrl('/contents');

      await helper.gotoTargetPage(content.id);
      await helper.strictHaveUrl('/contents');

      await helper.resetVirtualFixtures();
    });
  });
});

test.describe('author-aside', () => {
  test('if visit, fetch ok', async ({ page, context }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];

    await helper.gotoTargetPage(content.id);

    await expect(
      helper.getAuthorAside.getByAltText(user.nickname)
    ).toHaveAttribute('src', user.imgUrl);
    await expect(helper.getAuthorAside.getByText(user.nickname)).toBeVisible();
  });
});

test.describe('comment-section', () => {
  test('if not sign-in and click textarea, redirect to "/users/sign-in"', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];

    await helper.gotoTargetPage(content.id);

    await helper.getCommentSection.getByRole('textbox').click();
    await helper.strictHaveUrl('/users/sign-in');
  });

  test('if sign-in and click textarea, not redirect', async ({
    page,
    context,
  }) => {
    const helper = new Helper(page, context);
    const content = contentFixtures[0];
    const user = userFixtures[0];

    await helper.signIn(user.nickname);
    await helper.gotoTargetPage(content.id);

    await helper.getCommentSection.getByRole('textbox').click();
    await expect(page).not.toHaveURL('/users/sign-in');
  });
});
