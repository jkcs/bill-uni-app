import { BASE_URL } from '@/env'

export default class Request {
	config = {
		baseUrl: BASE_URL,
		header: {
			'content-type': 'application/json',
			'b-token': uni.getStorageSync('b-token'),
			'platform': uni.getStorageSync('platform')
		},
		method: 'GET',
		dataType: 'json',
		// #ifndef MP-ALIPAY || APP-PLUS
		responseType: 'text',
		// #endif
		// #ifdef MP-ALIPAY
		timeout: 60000,
		// #endif
		// #ifdef APP-PLUS
		sslVerify: false
		// #endif
	}

	static buildQueryString(params) {
		return Object.keys(params).map(k => `${k}=${encodeURIComponent(params[key])}`).join('&')
	}

	interceptor = {
		request: (cb) => {
			if (cb) {
				this.requestBeforeFun = cb
			}
		},
		response: (cb, ecb) => {
			if (cb && ecb) {
				this.requestComFun = cb
				this.requestComFail = ecb
			}
		}
	}

	requestBeforeFun(config) {
		return config
	}

	requestComFun(response) {
		return response
	}

	requestComFail(response) {
		return response
	}

	async request(options = {}) {
		options = Object.assign({}, options, this.config)
		// #ifndef MP-ALIPAY || APP-PLUS
		options.responseType = options.responseType || this.config.responseType
		// #endif
		// #ifdef MP-ALIPAY
		options.timeout = options.timeout || this.config.timeout
		// #endif
		// #ifdef APP-PLUS
		options.sslVerify = options.sslVerify === undefined ? this.config.sslVerify : options.sslVerify
		// #endif
		return new Promise((resolve, reject) => {
			options.complete = (response) => {
				if (200 === response.statusCode) { // 成功
					resolve(this.requestComFun(response))
				}  else {
					reject(this.requestComFail(response))
				}
			}

			const _config = { ...this.requestBeforeFun(options) }
			_config.url += _config.baseUrl
			if (JSON.stringify(_config.params) !== '{}') {
				const queryString = Request.buildQueryString(_config.params);
				_config.url += queryString.charCodeAt(0) === 0x63 ? `?${queryString}` : `&${queryString}`
			}
			uni.request(_config)
		})
	}

	get(url, options = {}) {
		return this.request({
			url,
			method: 'GET',
			...options
		})
	}

	post(url, data, options = {}) {
		return this.request({
			url,
			data,
			method: 'POST',
			...options
		})
	}

	upload(url, {
		// #ifdef APP-PLUS
		files,
		// #endif
		// #ifdef MP-ALIPAY
		fileType,
		// #endif
		filePath,
		name,
		header,
		formData
	}) {
		return new Promise((resolve, reject) => {
			let next = true
			let handleRe = {}
			const globalHeader = { ...this.config.header }
			delete globalHeader['content-type']
			const pubConfig = {
				baseUrl: this.config.baseUrl,
				url,
				// #ifdef APP-PLUS
				files,
				// #endif
				// #ifdef MP-ALIPAY
				fileType,
				// #endif
				filePath,
				method: 'UPLOAD',
				name,
				header: header || globalHeader,
				formData,
				complete: (response) => {
					response.config = handleRe
					if (response.statusCode === 200) { // 成功
						response = this.requestComFun(response)
						resolve(response)
					} else {
						response = this.requestComFail(response)
						reject(response)
					}
				}
			}
			const cancel = (t = 'cancel upload', config = pubConfig) => {
				const err = {
					errMsg: t,
					config: config
				}
				reject(err)
				next = false
			}

			handleRe = { ...this.requestBeforeFun(pubConfig, cancel) }
			const _config = { ...handleRe }
			if (!next) return
			_config.url = _config.baseUrl + _config.url
			uni.uploadFile(_config)
		})
	}
}
