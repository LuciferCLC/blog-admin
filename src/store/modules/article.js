/**
 * 文章
 */

import { success, error } from '@/utils/response'
import service from '@/api'

const state = {
  posting: false,
  fetch: false,
  list: [],
  total: 0,
  detail: {
    title: '',
    keyword: '',
    thumb: '',
    state: 0,
    publish: 0,
    type: 0,
    descript: '',
    tag: []
  }
}

const actions = {
  // 获取列表
  async getArts ({ commit }, data) {
    commit('REQUEST_LIST')
    const res = await service.getArts(data)
    if (res && res.code === 1) {
      const list = res.result.list.map((item) => {
        return { ...item, deleteing: false }
      })
      const total = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 获取单个文章
  async getArt ({ commit }, params) {
    commit('REQUEST_LIST')
    const res = await service.getArt(params)
    if (res && res.code === 1) {
      commit('REQUEST_DETAIL_SUCCESS', res.result)
    } else {
      error('REQUEST_DETAIL_FAIL')
    }
  },

  // 添加文章
  async postArt ({ commit }, article) {
    commit('POST_ARTICLE')
    const res = await service.postArt(article)
    if (res && res.code === 1) success('添加文章成功')
    else error('添加文章失败')
    commit('POST_ARTICLE_FINAL')
    return res
  },

  // 修改文章
  async putArt ({ commit }, article) {
    commit('POST_ARTICLE')
    const res = await service.putArt(article)
    if (res && res.code === 1) success('修改文章成功')
    else error('修改文章失败')
    commit('POST_ARTICLE_FINAL')
    return res
  },

  // 改变状态
  async patchArt ({ commit }, article) {
    const res = await service.patchArt(article)
    if (res && res.code === 1) {
      success('修改成功')
      commit('PATCH_HERO_SUCCESS', article)
    } else error(res.message)
    return res
  },

  // 删除
  async deleteArt ({ commit }, article) {
    commit('DELETE_ARTICLE', article)
    const res = await service.deleteArt(article)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_ARTICLE_FINAL', article)
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

  'DELETE_ARTICLE' (state, article) {
    state.list.find((item) => item._id === article._id).deleteing = true
  },

  'DELETE_ARTICLE_FINAL' (state, article) {
    state.list.find((item) => item._id === article._id).deleteing = false
  },

  'PATCH_HERO_SUCCESS' (state, article) {
    const list = state.list.find((item) => item._id === article._id)
    for (const key in article) {
      if (article.hasOwnProperty(key)) {
        list[key] = article[key]
      }
    }
  },

  'REQUEST_DETAIL_SUCCESS' (state, article) {
    state.detail = { ...article }
    state.fetch = false
  },

  'REQUEST_DETAIL_FAIL' (state) {
    state.fetch = false
  },

  'POST_ARTICLE' (state) {
    state.posting = true
  },

  'POST_ARTICLE_FINAL' (state) {
    state.posting = false
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
