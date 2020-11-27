<template>
	<view class="login-dialog-model" v-if="showLogin " cathctouchmove @tap="hideModal">
		去登陆
	</view>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: {
		value: {},
		modalType: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapState({
			showLoginTip: state => state.user.showLoginTip
		}),
		showLogin: {
			get() {
				return this.showLoginTip;
			},
			set(val) {
				this.$store.commit('LOGIN_TIP', val);
			}
		}
	},
	methods: {
		hideModal() {
			this.showLogin = false;
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
