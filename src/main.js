import Vue from 'vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import App from './App.vue'

import axios from 'axios'
// 配置axios
axios.defaults.baseURL = 'http://8.129.35.21:8080/api/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
