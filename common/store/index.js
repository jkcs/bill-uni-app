import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import getters from '@/common/store/getters'
import user from './modules/user.js'

const store = new Vuex.Store({
	modules: {
		user
	},
	getters
})

export default store
