import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { format } from './filters/index'

import './assets/scss/index.scss'

window.hljs = hljs

Vue.use(ElementUI)
Vue.component('markdown-editor', VueSimplemde)
Vue.filter('format', format)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
