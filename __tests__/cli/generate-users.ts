import { gen } from '@__tests__/generator';
import { objectToString } from '@__tests__/libs/object-to-string';
import { list } from 'radashi';

const main = (len: number) => {
  const instance = list(0, len - 1).map(() => gen.user.instance());

  const str = objectToString(instance);
  console.log(str);
};

main(1);
