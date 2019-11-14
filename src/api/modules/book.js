import ax from '../axios'

// 书本列表
export function getBooks (params) {
  return ax.get('/book', { params })
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 增加书本
export function postBook (params) {
  return ax.post('/book', params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 书本修改状态
export function patchBook (params) {
  return ax.patch(`/book/${params._id}`, params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 修改书本
export function putBook (params) {
  return ax.put(`/book/${params._id}`, params)
    .then(res => res.data)
    .catch(e => console.error(e))
}

// 删除书本
export function deleteBook (params) {
  return ax.delete(`/book/${params._id}`)
    .then(res => res.data)
    .catch(e => console.error(e))
}
