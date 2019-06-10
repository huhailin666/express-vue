import Vue from 'vue'
import App from './components/App.vue'
import axios from 'axios'
Vue.prototype.$http = axios

// import {Toast} from 'mint-ui'
// Vue.component(Toast.name,Toast);
// import 'mint-ui/lib/style.css'

import moment from 'moment'

Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD"){
  return moment(dataStr).format(pattern)
})

new Vue({
  render: h => h(App)
}).$mount('#app')