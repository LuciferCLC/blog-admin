import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = () => import(/* webpackChunkName: "index" */ '@/pages/Index.vue')

const routes = [{
  path: '/',
  name: 'index',
  component: Index,
  redirect: '/home',
  meta: { leaf: true, icon: 'icon-home' },
  children: [{
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Home.vue'),
    name: 'home',
    meta: { requiresAuth: true }
  }]
}, {
  path: '/',
  name: '文章管理',
  component: Index,
  meta: { leaf: false, icon: 'icon-article' },
  children: [{
    path: '/article/index',
    component: () => import(/* webpackChunkName: "article" */ '@/pages/article/Index.vue'),
    name: '文章列表',
    meta: { requiresAuth: true, icon: 'icon-list' }
  }, {
    path: '/article/release',
    component: () => import(/* webpackChunkName: "article" */ '@/pages/article/Release.vue'),
    name: '发布文章',
    meta: { requiresAuth: true, icon: 'icon-write' }
  }]
}, {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "login" */ '@/pages/Login.vue'),
  meta: { requiresAuth: false }
}]

const router = new VueRouter({
  routes
})

export default router
