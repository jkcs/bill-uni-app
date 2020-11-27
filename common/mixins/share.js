export default {
	data() {
		return {
			shareInfo: {
				title: '', // 分享标题
				path: '', // 转发链接  页面链接 或 域名
				imageUrl: '' // 分享图片
			}
		}
	},
	onLoad(options) {

	},
	// #ifdef MP-WEIXIN
	onShareAppMessage(res) {
		let that = this
		return {
			title: that.shareInfo.title,
			path: that.shareInfo.path,
			imageUrl: that.shareInfo.imageUrl,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			},
			complete() {}
		}
	},
	onShareTimeline(res) {
		return {
			title: this.shareInfo.title,
			query: '',
			imageUrl: this.shareInfo.imageUrl,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			},
			complete() {}
		}
	}
	// #endif
}
