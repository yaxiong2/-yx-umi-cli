import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { history } from 'umi'

const { NODE_ENV } = process.env
const proUrl = 'https://生产后台/'
const devUrl = 'http://本地后台/'
axios.defaults.baseURL = NODE_ENV === 'development' ? devUrl : proUrl

export function request(option: AxiosRequestConfig): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      option.withCredentials = false
      console.log(option)
      if (!option.headers) {
        option.headers = {}
      }
      option.headers['Access-Control-Allow-Origin'] = '*'
      if (!['/weixin/login', '/weixin/register'].includes(option.url as string)) {
        const token = localStorage.getItem('token')
        if (!token) {
          message.error('用户未登录，请先登录!')
          setTimeout(() => {
            history.replace('/login')
          }, 1000)
          return
        }
        option.headers.authorization = token
      }
      const { data } = await axios.request(option)
      if (data.code === 1 || data.code === 200) {
        resolve(data)
      } else {
        message.error(data.data)
        resolve({ code: -1, data: null })
      }
    } catch (e) {
      reject({
        code: -1,
        message: 'axios.request exception'
      })
    }
  })
}
