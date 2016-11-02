import { stringify } from 'qs';

export const toQueryString = (options = {}) =>
  stringify(options, {
    arrayFormat: 'brackets',
    sort: (a, b) => a.localeCompare(b),
  });

export const toKey = (path, options = {}) =>
  `${path}?${toQueryString(options)}`;