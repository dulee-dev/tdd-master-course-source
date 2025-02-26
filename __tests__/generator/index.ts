import { Content } from '@/domains/content/content.entity';
import { User } from '@/domains/user/user.entity';
import { faker } from '@faker-js/faker';
import { draw } from 'radashi';

const imgPath = ['/globe.svg', '/vercel.svg', '/window.svg'];

export const gen = {
  img: () => draw(imgPath) as string,

  content: {
    title: faker.book.title,
    body: () => faker.word.words({ count: { min: 5, max: 25 } }),

    instance: (partial?: Partial<Content>): Content => ({
      id: faker.string.uuid(),
      createdAt: faker.date.past(),
      title: gen.content.title(),
      body: gen.content.body(),
      thumbnail: gen.img(),
      authorId: faker.string.uuid(),
      ...partial,
    }),
  },

  user: {
    instance: (parital?: Partial<User>): User => ({
      id: faker.string.uuid(),
      nickname: faker.person.firstName(),
      imgUrl: gen.img(),
      ...parital,
    }),
  },
};
