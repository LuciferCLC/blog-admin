import Vue from 'vue'
import Vuex from 'vuex'

import { success, error } from '@/utils/response'
import service from '@/api'
import modules from './modules'

Vue.use(Vuex)

const state = {
  login: false,
  option: {
    _id: '',
    sub_title: '',
    title: '',
    keyword: '',
    descript: '',
    url: '',
    email: '',
    icp: ''
  },
  postOption: false,
  postUser: false,
  user: {
    _id: '',
    name: '',
    username: '',
    oldPassword: '',
    newPassword: '',
    slogan: '',
    gravatar: ''
  },
  QNtoken: ''
}

const actions = {
  // 登录
  async login ({ commit }, user) {
    commit('USER_LOGINING')
    const res = await service.login({ ...user })
    if (res && res.code === 1) {
      window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
      success('登录成功')
    } else {
      error(res.message)
    }
    commit('USER_LOGINING_FINAL')
    return res
  },

  // 用户信息初始化
  async initAuth ({ commit }) {
    const res = await service.getAuth()
    if (res && res.code === 1) commit('USER_INFO', res.result)
  },

  // 修改用户信息
  async putAuth ({ commit }, user) {
    commit('POST_USER_INFO')
    const res = await service.putAuth({ ...user })
    if (res && res.code === 1) success('修改用户信息成功')
    else error(res.message)
    commit('POST_USER_FINAL')
    return res
  },

  // 获取网站信息
  async getOpt ({ commit }) {
    const res = await service.getOpt()
    if (res && res.code === 1) commit('OPTION_INFO', res.result)
  },

  // 获取 qn token
  async getQiniu ({ commit }) {
    const res = await service.getQiniu()
    if (res && res.code === 1) commit('QN_TOKEN', res.result.token)
  },

  // 修改网站信息
  async putOpt ({ commit }, option) {
    commit('POST_OPTION_INFO')
    const res = await service.putOpt({ ...option })
    if (res && res.code === 1) success('修改成功')
    else error(res.message)
    commit('POST_OPTION_FINAL')
    return res
  }
}

const mutations = {
  'USER_LOGINING' (state) {
    state.login = true
  },

  'USER_LOGINING_FINAL' (state) {
    state.login = false
  },

  'USER_INFO' (state, user) {
    state.user = user
  },

  'POST_USER_INFO' (state) {
    state.postUser = true
  },

  'POST_USER_FINAL' (state) {
    state.postUser = false
  },

  'POST_OPTION_INFO' (state) {
    state.postOption = true
  },

  'POST_OPTION_FINAL' (state) {
    state.postOption = false
  },

  'OPTION_INFO' (state, option) {
    state.option = option
  },

  'QN_TOKEN' (state, token) {
    state.QNtoken = token
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules
})
