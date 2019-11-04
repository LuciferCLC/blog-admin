import ax from './axios';

// 获取评论
export function getComments(params) {
  return ax.get('/comment', { params })
    .then((res) => res.data)
    .catch((e) => console.error(e));
}

// 删除单条评论
export function deleteComment(params) {
  const { _id } = params;
  return ax.delete(`/comment/${_id}`, { params })
    .then((res) => res.data)
    .catch((e) => console.error(e));
}

// 修改单条评论状态
export function putComment(params) {
  const { _id } = params;
  return ax.put(`/comment/${_id}`, params)
    .then((res) => res.data)
    .catch((e) => console.error(e));
}
