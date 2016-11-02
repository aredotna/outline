import { toKey } from '../helpers';
import arena from '../apis/arena';
import httpLoader from './http';

export const arenaLoader = httpLoader(arena);

const load = (path, options = {}) => {
  const key = toKey(path, options);
  return arenaLoader.load(key);
};

export default load;