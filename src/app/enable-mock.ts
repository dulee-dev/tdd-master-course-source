import { mockServer } from '@__tests__/mock-api/mock-server';

const enableMock = () => {
  mockServer.listen();

  console.log('hi');
};

enableMock();
