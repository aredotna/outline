import DataLoader from 'dataloader';
import timer from '../timer';
import { error, verbose } from '../loggers';

export default api => {
  return new DataLoader(keys => Promise.all(keys.map(key => {
    const clock = timer(key);

    clock.start();

    return new Promise((resolve, reject) => {
      api(key)
        .then(({ body }) => {
          resolve(body);

          verbose(`Requested (Uncached): ${key}`);
          clock.end();
          cache.set(key, body);
        })
        .catch(err => {
          reject(err);
          error(key, err);
        });
    });
  })), {
    batch: false,
    cache: false,
  });
};
