import { HttpStatusCode } from 'axios'
import instance, { API_PATH } from '~/api/index'

export type SignUpPayloadType = {
  email: string
  password: string
  name: string
  agree: string
}
class ApiError extends Error {
  status: number

  constructor(message: string, status: HttpStatusCode) {
    super(message)

    this.status = status
  }
}

export const fetchSignUp = async (payload: SignUpPayloadType) => {
  try {
    const res = await instance.post(API_PATH.signUp, payload)
    return res
  } catch (error: any) {
    console.error('[fetchSignUp]', error)
    const { response } = error
    if (response) {
      const {
        data: { message },
        status,
      } = response
      const apiError = new ApiError(message, status)
      throw apiError
    }
  }
}
