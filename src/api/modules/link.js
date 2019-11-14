import ax from '../axios'

// 友链列表
export function getLinks (params) {
  return ax.get('/link', { params })
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 增加友链
export function postLink (params) {
  return ax.post('/link', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 友链修改状态
export function patchLink (params) {
  return ax.patch(`/link/${params._id}`, params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 修改友链
export function putLink (params) {
  return ax.put(`/link/${params._id}`, params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 删除友链
export function deleteLink (params) {
  return ax.delete(`/link/${params._id}`)
    .then(res => res.data)
    .catch(e => console.error(e))
}
