import { createActions } from 'redux-actions';

import * as dao from '../api/auth';

// // 登录
// async function login (
//   { commit },
//   user
// ) {
//   commit('USER_LOGINING')
//   const res: Ajax.AjaxResponse = await service.login({ ...user })
//   if (res && res.code === 1) {
//     window.localStorage.setItem('TOKEN', JSON.stringify(res.result))
//     success('登录成功')
//   } else {
//     error(res.message)
//   }
//   commit('USER_LOGINING_FINAL')
//   return res
// },

// // 用户信息初始化
// async initAuth ({ commit }): Promise<void> {
//   const res: Ajax.AjaxResponse = await service.getAuth()
//   if (res && res.code === 1) commit('USER_INFO', res.result)
// },

// // 修改用户信息
// async putAuth (
//   { commit },
//   user: StoreState.User
// ): Promise<Ajax.AjaxResponse> {
//   commit('POST_USER_INFO')
//   const res: Ajax.AjaxResponse = await service.putAuth({ ...user })
//   if (res && res.code === 1) success('修改用户信息成功')
//   else error(res.message)
//   commit('POST_USER_FINAL')
//   return res
// },

// // 获取网站信息
// async getOpt ({ commit }): Promise<void> {
//   const res: Ajax.AjaxResponse = await service.getOpt()
//   if (res && res.code === 1) commit('OPTION_INFO', res.result)
// },

// // 获取 qn token
// async getQiniu ({ commit }): Promise<void> {
//   const res: Ajax.AjaxResponse = await service.getQiniu()
//   if (res && res.code === 1) commit('QN_TOKEN', res.result.token)
// },

// // 修改网站信息
// async putOpt (
//   { commit },
//   option: StoreState.Option
// ): Promise<Ajax.AjaxResponse> {
//   commit('POST_OPTION_INFO')
//   const res: Ajax.AjaxResponse = await service.putOpt({ ...option })
//   if (res && res.code === 1) success('修改成功')
//   else error(res.message)
//   commit('POST_OPTION_FINAL')
//   return res
// }


const {
  login, initAuth, putAuth, getOpt, putOpt,
} = createActions({
  LOGIN: (params) => dao.login(params),
  INIT_AUTH: () => dao.getAuth(),
  PUT_AUTH: ({ ...user }) => dao.putAuth(user),
  GET_OPT: () => dao.getOpt(),
  PUT_OPT: ({ ...option }) => dao.putOpt(option),
});

export {
  login, initAuth, putAuth, getOpt, putOpt
};
