import request from '@/common/request/index'
const token = uni.getStorageSync('b-token') || ''

const user = {
	state: {
		userInfo: {},
		showLoginTip: false,
		token
	},
	mutations: {
		LOGIN_TIP: ({ state }, isShow) => {
			state.showLoginTip = isShow
		},
		USER_INFO: ({ state }, userInfo) => {
			state.userInfo = userInfo
		}
	},
	actions: {
		getUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				request.get('/api/user').then(res => {
					commit('LOGIN_TIP', false)
					commit('USER_INFO', res.data)
					resolve(res)
				}).catch(e => {
					reject(e)
				})
			})
		},
		findOrLogin({ commit }) {
			console.log()
			// request.post('/api/findOrCreate', { deviceId })
		}
	}
}
export default user
