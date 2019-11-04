import ax from './axios';

// 获取文章列表
function getArts(params) {
  return ax.get('/article', { params })
    .then((res) => res.data)
    .catch((e) => console.error(e));
}

// 获取单个文章
function getArt({ _id }) {
  return ax.get(`/article/${_id}`)
    .then((res) => res.data)
    .catch((e) => console.error(e));
}

// 修改单个文章
function putArt(params) {
  const { _id } = params;
  return ax.put(`/article/${_id}`, params)
    .then((res) => res.data)
    .catch((e) => console.error(e));
}

// 删除文章
function deleteArt({ _id }) {
  return ax.delete(`/article/${_id}`)
    .then((res) => res.data)
    .catch((e) => console.error(e));
}

// 添加文章
function postArt(params) {
  return ax.post('/article', params)
    .then((res) => res.data)
    .catch((e) => console.error(e));
}

// 修改文章状态
function patchArt(params) {
  const { _id } = params;
  return ax.patch(`/article/${_id}`, params)
    .then((res) => res.data)
    .catch((e) => console.error(e));
}

export {
  getArts,
  getArt,
  putArt,
  deleteArt,
  postArt,
  patchArt
};
