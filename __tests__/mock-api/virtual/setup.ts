import { contentFixtures } from '@__tests__/fixtures/content-fixture';
import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { cloneDeep } from 'radashi';

export const reset = () => {
  globalThis.virtual = {
    contents: cloneDeep(contentFixtures),
    users: cloneDeep(userFixtures),
  };
};
