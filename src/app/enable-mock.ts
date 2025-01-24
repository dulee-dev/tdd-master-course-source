import { checkIsMock } from '@__tests__/libs/check-is-mock';
import { mockServer } from '@__tests__/mock-api/mock-server';

const enableMock = () => {
  if (checkIsMock()) mockServer.listen();
};

enableMock();
