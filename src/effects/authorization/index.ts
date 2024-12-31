import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const getAuthUser = async (
  cookies: () => Promise<ReadonlyRequestCookies>
) => {
  const cookieStore = await cookies();
  const authorization = cookieStore.get('authorization')?.value;

  return authorization !== undefined
    ? {
        nickname: authorization,
      }
    : undefined;
};
