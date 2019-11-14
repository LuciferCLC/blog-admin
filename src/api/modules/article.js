import ax from '../axios'

// 获取文章列表
export function getArts (params) {
  return ax.get('/article', { params })
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 获取单个文章
export function getArt (params) {
  return ax.get(`/article/${params._id}`)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 修改单个文章
export function putArt (params) {
  return ax.put(`/article/${params._id}`, params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 删除文章
export function deleteArt (params) {
  return ax.delete(`/article/${params._id}`)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 添加文章
export function postArt (params) {
  return ax.post('/article', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 修改文章状态
export function patchArt (params) {
  return ax.patch(`/article/${params._id}`, params)
    .then(res => res.data)
    .catch(e => console.error(e))
}
