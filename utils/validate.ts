import regexp from '~/common/regexp'
import { inputName } from '~/pages/auth/signup.vue'

export const validateSignUp = (name: string, value = '') => {
  let message = ''
  switch (name) {
    case inputName.nickname:
      if (value.length < 2 || regexp.specialRegex.test(value)) {
        message = '닉네임은 두 글자 이상(특수문자 입력 불가) 입력해주세요.'
      }
      break
    case inputName.email:
      if (!regexp.emailRegex.test(value)) {
        message = '이메일 형식이 유효하지 않습니다.'
      }

      break
    default:
      break
  }

  return message
}
