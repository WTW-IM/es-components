import { noop } from 'lodash';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
global.requestAnimationFrame = noop;
