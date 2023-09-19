import axios from 'axios'
import { fetchRefreshToken } from './member'
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
  async (error) => {
    const { response } = error
    if (response) {
      const { status } = response
      if (status === 401) {
        // const token = await fetchRefreshToken()
        // token.setToken(token)
      }
    }

    return Promise.reject(error)
  }
)

export const API_PATH = {
  refresh: 'auth/refresh',
  signUp: 'auth/signup',
  login: 'auth/login',
  user: 'member/user',
} as const

export default instance
