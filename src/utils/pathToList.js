export const urlToList = (url) => {
  const urllist = url.split('/').filter((i) => i);
  return urllist.map((_, index) => `/${urllist.slice(0, index + 1).join('/')}`);
};
