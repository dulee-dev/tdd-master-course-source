import { checkIsMock } from '@__tests__/libs/check-is-mock';
import { mockServer } from '@__tests__/mock-api/mock-server';

if (checkIsMock()) mockServer.listen();
