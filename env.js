const BASE_URL_ARR = {
	development: 'http://127.0.0.1:9001/api', // dev
	uat: 'http://127.0.0.1:9001/uat', // uat fat
	production: 'https://m.qrllk.cn/api', // pro
}

export const BASE_URL = BASE_URL_ARR[process.env.NODE_ENV || 'development']
