export const checkIsMock = () => {
  return process.env.MOCK === 'true';
};
