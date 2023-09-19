import axios from 'axios'
import token from '~/utils/token'

const instance = axios.create({
  baseURL: process.env.serverUrl || 'http://localhost:3000',
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    debugger
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data.accessToken) {
      const {
        data: {
          data: { accessToken },
        },
      } = response
      token.setToken(accessToken)
      instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }

    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export const API_PATH = {
  signUp: 'auth/signup',
  login: 'auth/login',
  user: 'member/user',
} as const

export default instance
