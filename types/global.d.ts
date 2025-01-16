import { Content } from '@/domains/content/content.entity';
import { User } from '@/domains/user/user.entity';

/* eslint-disable no-var */
export declare global {
  var virtual: {
    contents: Content[];
    users: User[];
  };
}
