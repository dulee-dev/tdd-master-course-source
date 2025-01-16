'use server';

import { virtualFixturesApi } from '@/effects/__dev__/virtual-fixture-api.effect';

export const resetVirtualFixturesAction = async () => {
  await virtualFixturesApi.reset();
};
