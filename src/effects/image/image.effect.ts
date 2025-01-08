import { gen } from '@__tests__/generator';

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const uploadImg = async (imageFile: File) => {
  // 실제 api -> upload된 src의 url 리턴
  await delay(300);
  return gen.img();
};
