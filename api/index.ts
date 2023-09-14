import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.serverUrl || 'http://localhost:3000',
})

export const API_PATH = {
  signUp: 'auth/signup',
  login: 'auth/login',
} as const

export default instance
