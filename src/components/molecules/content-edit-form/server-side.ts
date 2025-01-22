'use server';

import { cookies } from 'next/headers';
import { contentApi } from '@/effects/main/content-api.effect';
import { Content } from '@/domains/content/content.entity';

export const editContentAction = async (
  partial: Pick<Content, 'id' | 'title' | 'body' | 'thumbnail'>
) => {
  const cookieStore = await cookies();
  const authorization = cookieStore.get('authorization')?.value;
  if (authorization === undefined) return undefined;

  const response = await contentApi.edit({ authorization, ...partial });
  if (response.status !== 200) return undefined;

  return response.data.content;
};
