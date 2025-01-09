import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { gen } from '@__tests__/generator';
import { objectToString } from '@__tests__/libs/object-to-string';
import { faker } from '@faker-js/faker';
import { list } from 'radashi';

const main = (len: number) => {
  const instance = list(0, len - 1).map((i) => {
    const user = userFixtures[0];
    // if (i === 1)
    //   return gen.content.instance({ authorId: user.id, createAt: new Date() });
    // if (i === 2)
    //   return gen.content.instance({
    //     authorId: user.id,
    //     title: '00000000' + faker.string.sample(),
    //   });
    // return gen.content.instance({ authorId: user.id });
    return gen.content.instance({ authorId: user.id });
  });

  const str = objectToString(instance);
  console.log(str);
};

main(1);
