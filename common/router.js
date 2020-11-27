import Vue from 'vue'
import Router from 'uni-simple-router'
import store from '@/common/store'

Vue.use(Router)
//初始化
const router = new Router({
	APP: {
		animation: {
			animationType: 'pop-in',
			animationDuration: 300
		}
	},
	encodeURI: false,
	routes: ROUTES //路由表
});

router.beforeEach((to, from, next) => {
	// 权限控制
	if (to.meta && to.meta.auth && !!store.getters.token) {
		store.commit('LOGIN_TIP', true)
		return
	}
	next()
})
export default router;
