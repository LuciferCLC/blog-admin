/**
 * 评论
 */

import { success, error } from '@/utils/response'
import service from '@/api'

const state = {
  fetch: false,
  posting: false,
  list: [],
  total: 0
}

const actions = {
  // 获取列表
  async getComments ({ commit }, data) {
    commit('REQUEST_LIST')
    const res = await service.getComments(data)
    if (res && res.code === 1) {
      const list = res.result.data.map((item) => {
        return { ...item, deleteing: false }
      })
      const total = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 修改评论
  async putComment ({ commit }, comment) {
    commit('POSTING_COMMENT')
    const res = await service.putComment(comment)
    if (res && res.code === 1) {
      success('修改成功')
      commit('PUT_COMMENT_SUCCESS', comment)
    } else error(res.message)
    commit('POSTING_COMMENT_FINAL')
    return res
  },

  // 删除
  async deleteComment ({ commit }, comment) {
    commit('DELETE_COMMENT', comment)
    const res = await service.deleteComment(comment)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_COMMENT_FINAL', comment)
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

  'DELETE_COMMENT' (state, comment) {
    state.list.find((item) => item._id === comment._id).deleteing = true
  },

  'DELETE_COMMENT_FINAL' (state, comment) {
    state.list.find((item) => item._id === comment._id).deleteing = false
  },

  'POSTING_COMMENT' (state) {
    state.posting = true
  },

  'POSTING_COMMENT_FINAL' (state) {
    state.posting = false
  },

  'PUT_COMMENT_SUCCESS' (state, comment) {
    state.list.find((item) => item._id === comment._id).state = comment.state
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
