import Request from './request'
import store from '@/common/store/index'

const request = new Request()

request.interceptor.request((config) => {
  return config
})

request.interceptor.response((response) => { /* 请求之后拦截器 */
  if (response.data.code !== 200) {
    uni.showToast({
      title: response.data.msg || '系统未知异常,稍后重试',
      icon: 'none',
      duration: 1500,
      mask: true
    })
  } else if (response.data.code === 400) {
    uni.removeStorageSync('token')
    store.commit('LOGIN_TIP', true)
    return Promise.reject(new Error('invalid token'))
  } else {
    return response.data
  }
  return Promise.reject(new Error('error'))
}, (response) => {
  return response
})

export default request
