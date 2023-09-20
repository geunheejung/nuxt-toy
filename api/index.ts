import axios from 'axios'
import token from '~/utils/token';

axios.defaults.withCredentials = true
const instance = axios.create({
  baseURL: process.env.serverUrl || 'http://localhost:3000',
  withCredentials: true,
})

instance.interceptors.request.use((config) => {
  return config;
}, function (error) {
  // 요청 오류가 있는 작업 수행
  return Promise.reject(error);
})

export const API_PATH = {
  refresh: 'auth/refresh',
  signUp: 'auth/signup',
  login: 'auth/login',
  user: 'member/user',
} as const

export default instance
