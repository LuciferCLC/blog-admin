import Vue from 'vue'
import VueRouter from 'vue-router'

import { loginIn } from '@/utils/loginIn'

Vue.use(VueRouter)

const Index = () => import(/* webpackChunkName: "index" */ '@/pages/Index.vue')

const routes = [{
  path: '/',
  name: 'Index',
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
  path: '/',
  name: '文章标签',
  component: Index,
  meta: { leaf: true, icon: 'icon-tag' },
  children: [{
    path: '/tag',
    component: () => import(/* webpackChunkName: "tag" */ '@/pages/Tags.vue'),
    name: '文章标签',
    meta: { equiresAuth: true, icon: 'icon-tag' }
  }]
}, {
  path: '/',
  name: '评论',
  component: Index,
  meta: { leaf: true, icon: 'icon-comments' },
  children: [{
    path: '/comment',
    component: () => import(/* webpackChunkName: "comments" */ '@/pages/Comments.vue'),
    name: '评论',
    meta: { requiresAuth: true, icon: 'icon-comments' }
  }]
}, {
  path: '/',
  name: '留言墙',
  component: Index,
  meta: { leaf: true, icon: 'icon-hero' },
  children: [{
    path: '/heros',
    component: () => import(/* webpackChunkName: "heros" */ '@/pages/Heros.vue'),
    name: '留言墙',
    meta: { requiresAuth: true }
  }]
}, {
  path: '/',
  name: '书',
  component: Index,
  meta: { leaf: true, icon: 'icon-sell' },
  children: [{
    path: '/book',
    component: () => import(/* webpackChunkName: "book" */ '@/pages/Book.vue'),
    name: '书',
    meta: { requiresAuth: true }
  }]
}, {
  path: '/',
  name: '友链',
  component: Index,
  meta: { leaf: true, icon: 'icon-link1' },
  children: [{
    path: '/link',
    component: () => import(/* webpackChunkName: "book" */ '@/pages/Links.vue'),
    name: '友链',
    meta: { requiresAuth: true }
  }]
}, {
  path: '/',
  name: '全局设置',
  component: Index,
  meta: { leaf: true, icon: 'icon-set' },
  children: [{
    path: '/set',
    component: () => import(/* webpackChunkName: "set" */ '@/pages/Set.vue'),
    name: '全局设置',
    meta: { page: 'set', requiresAuth: true }
  }]
}, {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "login" */ '@/pages/Login.vue'),
  meta: { requiresAuth: false }
}]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loginIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
