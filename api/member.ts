import { HttpStatusCode } from 'axios'
import instance, { API_PATH } from '~/api/index'

class ApiError extends Error {
  status: number

  constructor(message: string, status: HttpStatusCode) {
    super(message)

    this.status = status
  }
}

export type SignUpPayloadType = {
  email: string
  password: string
  name: string
  agree: string
}

export const fetchSignUp = async (payload: SignUpPayloadType) => {
  try {
    const res = await instance.post(API_PATH.signUp, payload)
    return res
  } catch (error: any) {
    if (!error.response) throw new ApiError(error.message, 500)
    const {
      data: { message },
      status,
    } = error.response

    throw new ApiError(message, status)
  }
}

export type LoginPayloadType = {
  email: string
  password: string
}

export const fetchLogin = async (payload: LoginPayloadType) => {
  try {
    const res = await instance.post(API_PATH.login, payload)
    return res
  } catch (error: any) {
    if (!error.response) throw new ApiError(error.message, 500)
    const {
      data: { message },
      status,
    } = error.response

    throw new ApiError(message, status)
  }
}

export const fetchGetUser = async () => {
  try {
    const res = await instance.get(API_PATH.user)
    return res
  } catch (error: any) {
    if (!error.response) throw new ApiError(error.message, 500)

    const {
      data: { message },
      status,
    } = error.response

    throw new ApiError(message, status)
  }
}

export const fetchRefreshToken = async () => {
  try {
    const res = await instance.post(API_PATH.refresh)

    return res.data.data
  } catch (error: any) {
    if (!error.response) throw new ApiError(error.message, 500)

    const {
      data: { message },
      status,
    } = error.response

    throw new ApiError(message, status)
  }
}
