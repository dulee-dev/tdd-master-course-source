import { User } from '../user/user.entity';
import { Content } from './content.entity';

export interface ContentView extends Omit<Content, 'authorId'> {
  author: User;
}
