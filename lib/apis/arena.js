import { assign } from 'lodash';
import fetch from './fetch';
import config from '../../config';

const { ARENA_API_URL } = process.env;

export default (path, accessToken) => {
  const headers = {};
  if (accessToken) assign(headers, { 'X-AUTH-TOKEN': accessToken });
  return fetch(`${ARENA_API_URL}/${path}`, { headers });
};
