import Vue from 'vue'
import App from './App'
import store from '@/common/store'
import request from '@/common/request'
import { BASE_URL } from './env'
import share from '@/common/mixins/share'
import { RouterMount } from 'uni-simple-router'

Vue.mixin(share)
Vue.prototype.$request = request
Vue.prototype.$BASE_URL = BASE_URL
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
});


// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount();
// #endif
