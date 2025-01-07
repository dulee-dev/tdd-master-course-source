export const validateTitle = (title: string): boolean => {
  const ok = title.length < 2 ? false : title.length > 80 ? false : true;

  return ok;
};

export const validateBody = (body: string): boolean => {
  const ok = body.length > 20000 ? false : true;

  return ok;
};
