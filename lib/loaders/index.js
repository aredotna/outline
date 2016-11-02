import { arenaLoader } from './arena';

export default {
  loaders: {
    arena: arenaLoader,
  },

  clearAll: () => {
    arenaLoader.clearAll();
  },
};
