import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.less'
import 'lib-flexible'
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
import HmPost from './components/HmPost.vue'
import HmComment from './components/HmComment.vue'
import HmFloor from './components/HmFloor.vue'

import './styles/base.less'
import './styles/iconfont.css'
import {
  Field,
  Cell,
  Toast,
  CellGroup,
  Dialog,
  Radio,
  RadioGroup,
  Uploader,
  List,
  Tab,
  Tabs,
  PullRefresh,
  Sticky,
} from 'vant'
// 注册一个全局过滤器
import moment from 'moment'
Vue.filter('date', function(val, format = 'YYYY-MM-DD') {
  return moment(val).format(format)
})

Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.use(Sticky)
Vue.config.productionTip = false
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post', HmPost)
Vue.component('hm-floor', HmFloor)
Vue.component('hm-comment', HmComment)

// axios处理
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

// 请求拦截器
// 拦截所有的axios的请求
// axios.get(url,config)
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截器
axios.interceptors.response.use(res => {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message == '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    router.push('/login')
  }
  return res
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
