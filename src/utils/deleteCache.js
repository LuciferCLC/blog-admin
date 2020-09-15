export const deleteCache = (cache, key) => {
  Object.keys(cache.data.data).forEach(() => {
    key.match(key) && cache.data.delete(key);
  });
};
