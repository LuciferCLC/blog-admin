/**
 * 标签数据
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
  async getTags ({ commit }, data) {
    commit('REQUEST_LIST')
    const res = await service.getTags(data)
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
  async postTag ({ commit }, tag) {
    commit('POST_TAG')
    const res = await service.postTag(tag)
    if (res && res.code === 1) success('添加标签成功')
    else error(res.message)
    commit('POST_TAG_FINAL')
    return res
  },

  // 修改
  async putTag ({ commit }, tag) {
    commit('POST_TAG')
    const res = await service.putTag(tag)
    if (res && res.code === 1) {
      success('修改标签成功')
      commit('POST_TAG_SUCCESS', tag)
    } else error(res.message)
    commit('POST_TAG_FINAL')
    return res
  },

  // 排序
  async patchTag ({ commit }, ids) {
    const res = await service.patchTag(ids)
    if (res && res.code === 1) {
      success('标签排序成功')
    } else error(res.message)
  },

  // 删除
  async deleteTag ({ commit }, tag) {
    commit('DELETE_TAG', tag)
    const res = await service.deleteTag(tag)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_TAG_FINAL', tag)
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

  'POST_TAG' (state) {
    state.posting = true
  },

  'POST_TAG_FINAL' (state) {
    state.posting = false
  },

  'POST_TAG_SUCCESS' (state, tag) {
    const item = state.list.find((item) => item._id === tag._id)
    if (item) {
      item.name = tag.name
      item.descript = tag.descript
    }
  },

  'DELETE_TAG' (state, tag) {
    state.list.find((item) => item._id === tag._id).deleteing = true
  },

  'DELETE_TAG_FINAL' (state, tag) {
    state.list.find((item) => item._id === tag._id).deleteing = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
