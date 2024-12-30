/* eslint-disable @typescript-eslint/no-explicit-any */
export const objectToString = (obj: any): string => {
  if (obj === null) {
    return 'null';
  }
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      // 배열 처리
      return `[${obj.map((item) => objectToString(item)).join(', ')}]`;
    } else if (obj instanceof Date) {
      return `new Date("${obj.toISOString()}")`;
    } else {
      // 객체 처리
      const entries = Object.entries(obj)
        .map(([key, value]) => `${key}: ${objectToString(value)}`)
        .join(', ');
      return `{${entries}}`;
    }
  }
  if (typeof obj === 'string') {
    return `"${obj}"`; // 문자열은 따옴표로 감싸기
  }
  return String(obj); // 숫자, 불리언, undefined 등
};
