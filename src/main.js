import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/css/global.css'
import axios from 'axios'

Vue.config.productionTip = false
// 设置默认url
axios.default.baseURL = '/api/private/v1/'
// 将axios封装为vue的属性
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
