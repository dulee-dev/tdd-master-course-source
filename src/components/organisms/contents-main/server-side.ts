'use server';

import { ContentSortOption } from '@/domains/content/content.type';
import { contentApi } from '@/effects/main/content-api.effect';

export const loadCount = async (search?: string) => {
  const response = await contentApi.countAll(search);

  return response.data.count;
};

export const loadContentItems = async (query: {
  pageTake: number;
  pageNum: number;
  sort?: ContentSortOption;
  search?: string;
}) => {
  const response = await contentApi.findAll(query);

  return response.data.contents;
};
