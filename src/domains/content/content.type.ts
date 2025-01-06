import { User } from '../user/user.entity';
import { contentSortOption } from './content.constant';
import { Content } from './content.entity';

export interface ContentView extends Omit<Content, 'authorId'> {
  author: User;
}

export type ContentSortOption =
  (typeof contentSortOption)[keyof typeof contentSortOption];
