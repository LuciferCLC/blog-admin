/**
 * book 数据
 */

import { success, error } from '@/utils/response'
import service from '@/api'

const state = {
  posting: false,
  fetch: false,
  list: [],
  total: 0
}

const actions = {
  // 获取列表
  async getBooks ({ commit }, data) {
    commit('REQUEST_LIST')
    const res = await service.getBooks(data)
    if (res && res.code === 1) {
      const list = res.result.list.map((item) => {
        return { ...item, deleteing: false }
      })
      const total = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 添加
  async postBook ({ commit }, book) {
    commit('POST_BOOK')
    const res = await service.postBook(book)
    if (res && res.code === 1) success('添加数据成功')
    else error(res.message)
    commit('POST_BOOK_FINAL')
    return res
  },

  // 修改
  async putBook ({ commit }, book) {
    commit('POST_BOOK')
    const res = await service.putBook(book)
    if (res && res.code === 1) {
      success('修改数据成功')
      commit('POST_BOOK_SUCCESS', book)
    } else error(res.message)
    commit('POST_BOOK_FINAL')
    return res
  },

  // 修改状态
  async patchBook ({ commit }, book) {
    const res = await service.patchBook(book)
    if (res && res.code === 1) {
      success('数据状态成功')
      commit('PATCH_BOOK_SUCCESS', book)
    } else error(res.message)
  },

  // 删除
  async deleteBook ({ commit }, book) {
    commit('DELETE_BOOK', book)
    const res = await service.deleteBook(book)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_BOOK_FINAL', book)
    return res
  }
}

const mutations = {
  'REQUEST_LIST' (state) {
    state.fetch = true
  },

  'REQUEST_LIST_SUCCESS' (state, payload) {
    state.fetch = false
    state.list = payload.list
    state.total = payload.total
  },

  'REQUEST_LIST_FAIL' (state) {
    state.fetch = false
    state.list = []
    state.total = 0
  },

  'POST_BOOK' (state) {
    state.posting = true
  },

  'POST_BOOK_FINAL' (state) {
    state.posting = false
  },

  'POST_BOOK_SUCCESS' (state, book) {
    const item = (state.list.find((item) => item._id === book._id))
    if (item) {
      item.name = book.name
      item.descript = book.descript
      item.thumb = book.thumb
    }
  },

  'PATCH_BOOK_SUCCESS' (state, book) {
    state.list.find((item) => item._id === book._id).state = book.state
  },

  'DELETE_BOOK' (state, book) {
    state.list.find((item) => item._id === book._id).deleteing = true
  },

  'DELETE_BOOK_FINAL' (state, book) {
    state.list.find((item) => item._id === book._id).deleteing = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
