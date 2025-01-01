import { userFixtures } from '@__tests__/fixtures/user-fixture';
import { gen } from '@__tests__/generator';
import { objectToString } from '@__tests__/libs/object-to-string';
import { list } from 'radashi';

const main = (len: number) => {
  const instance = list(0, len - 1).map((i) => {
    const user = userFixtures[0];
    return gen.content.instance({ authorId: user.id });
  });

  const str = objectToString(instance);
  console.log(str);
};

main(1);
