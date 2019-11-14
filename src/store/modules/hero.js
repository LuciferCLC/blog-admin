/**
 * 英雄版（留言墙）
 */

import { success, error } from '@/utils/response'
import service from '@/api'

const state = {
  fetch: false,
  list: [],
  total: 0
}

const actions = {
  // 获取列表
  async getHeros ({ commit }, data) {
    commit('REQUEST_LIST')
    const res = await service.getHeros(data)
    if (res && res.code === 1) {
      const list = res.result.list.map((item) => {
        return { ...item, deleteing: false }
      })
      const total = res.result.pagination.total
      commit('REQUEST_LIST_SUCCESS', { list, total })
    } else commit('REQUEST_LIST_FAIL')
    return res
  },

  // 改变状态
  async patchHero ({ commit }, hero) {
    const res = await service.patchHero(hero)
    if (res && res.code === 1) {
      success('修改成功')
      commit('PATCH_HERO_SUCCESS', hero)
    } else error(res.message)
    return res
  },

  // 删除
  async deleteHero ({ commit }, hero) {
    commit('DELETE_TAG', hero)
    const res = await service.deleteHero(hero)
    if (res && res.code === 1) success('删除成功')
    else error(res.message)
    commit('DELETE_TAG_FINAL', hero)
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

  'DELETE_TAG' (state, hero) {
    state.list.find((item) => item._id === hero._id).deleteing = true
  },

  'DELETE_TAG_FINAL' (state, hero) {
    state.list.find((item) => item._id === hero._id).deleteing = false
  },

  'PATCH_HERO_SUCCESS' (state, hero) {
    state.list.find((item) => item._id === hero._id).state = hero.state
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
