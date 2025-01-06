export const castNullableStrToNum = (str: string | null): number | null => {
  if (str === null) return null;

  const casted = +str;
  if (Number.isNaN(casted)) return null;

  return casted;
};
