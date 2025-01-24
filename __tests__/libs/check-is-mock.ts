export const checkIsMock = () => {
  return process.env.NEXT_PUBLIC_MOCK === 'true';
};
