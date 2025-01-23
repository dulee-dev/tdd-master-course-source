'use server';

import { cookies } from 'next/headers';
import { contentApi } from '@/effects/main/content-api.effect';

export const deleteContentAction = async (id: string) => {
  const cookieStore = await cookies();
  const authorization = cookieStore.get('authorization')?.value;
  if (authorization === undefined) return undefined;

  const response = await contentApi.delete({ authorization, id });
  if (response.status !== 200) return undefined;

  return { success: true };
};
