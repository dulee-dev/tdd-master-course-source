'use server';

import { cookies } from 'next/headers';
import { contentApi } from '@/effects/main/content-api.effect';
import { Content } from '@/domains/content/content.entity';

export const createContentAction = async (
  partial: Pick<Content, 'title' | 'body' | 'thumbnail'>
) => {
  const cookieStore = await cookies();
  const authorization = cookieStore.get('authorization')?.value;
  if (authorization === undefined) return undefined;

  const response = await contentApi.create({ authorization, ...partial });
  if (response.status !== 201) return undefined;

  return response.data.content;
};
