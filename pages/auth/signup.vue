<template>
  <div class="auth-grid">
    <div class="btn-wrapper">
      <Button>
        <template #icon>
          <i class="fa-brands fa-instagram"></i>
        </template>
        네이버로 로그인
      </Button>
      <Button>
        <template #icon>
          <i class="fa-brands fa-facebook"></i>
        </template>
        카카오로 로그인
      </Button>
      <Button>
        <template #icon>
          <i class="fa-brands fa-slack"></i>
        </template>
        Apple로 로그인
      </Button>
    </div>
    <DivisionLine :text="'또는'"></DivisionLine>
    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="text-field-wrapper">
        <div>
          <TextField
            :name="inputName.nickname"
            :input-value="formData[inputName.nickname]"
            :placeholder="'닉네임'"
            @onInput="handleInput"
          />
          <p class="error-message">
            {{ errorMsg(inputName.nickname) }}
          </p>
        </div>
        <div>
          <TextField
            :name="inputName.email"
            :input-value="formData[inputName.email]"
            :placeholder="'이메일'"
            :type="'email'"
            @onInput="handleInput"
          />
          <p class="error-message">
            {{ errorMsg(inputName.email) }}
          </p>
        </div>
        <div>
          <TextField
            :name="inputName.password"
            :input-value="formData[inputName.password]"
            :placeholder="'비밀번호'"
            :type="'password'"
            @onInput="handleInput"
          />

          <div class="password-rule">
            <p>- 문자/숫자/특수문자 중 2가지 이상 조합 (8~30자)</p>
            <p>- 3개 이상 키보드 상 배열이 연속되거나 동일한 문자/숫자 제외</p>
          </div>
        </div>
        <div>
          <TextField
            :name="inputName.rePassword"
            :input-value="formData[inputName.rePassword]"
            :placeholder="'비밀번호 확인'"
            :type="'password'"
            @onInput="handleInput"
          />
        </div>
      </div>
      <div class="checkbox-wrapper">
        <div class="checkbox-field">
          <input
            id="all-agree"
            type="checkbox"
            :checked="isAllChecked"
            @click="handleAllCheck"
          />
          <label for="all-agree">아래 약관에 모두 동의합니다.</label>
        </div>
        <DivisionLine> </DivisionLine>
        <div v-for="item in checkedData" :key="item.id" class="checkbox-field">
          <input
            :id="item.id"
            type="checkbox"
            :name="item.id"
            :checked="item.isChecked"
            :value="item.id"
            @click="handleCheck"
          />
          <label :for="item.id">
            <span>
              {{ item.content }} ({{ item.isRequired ? '필수' : '선택' }})
            </span>
          </label>
        </div>
      </div>
      <div class="submit-container">
        <Button :style-type="'submit'" :type="'submit'"> 회원가입 </Button>
      </div>
    </form>
    <nuxt-link to="/auth/login">로그인</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { SignUpPayloadType } from '../../api/member'
import { validateSignUp } from '~/utils/validate'
import { ACTION } from '~/store'
import openToast from '~/utils/openToast'

export const inputName = {
  nickname: 'nickname',
  email: 'email',
  password: 'password',
  rePassword: 'rePassword',
} as const

const data = {
  formData: {
    [inputName.nickname]: '',
    [inputName.email]: '',
    [inputName.password]: '',
    [inputName.rePassword]: '',
  },
  formErrorMessage: {
    [inputName.nickname]: '',
    [inputName.email]: '',
    [inputName.password]: '',
    [inputName.rePassword]: '',
  },
  isAllChecked: false,
  checkedData: [
    {
      id: 'terms',
      content: '서비스 이용약관',
      isRequired: true,
      isChecked: false,
    },
    {
      id: 'Privacy',
      content: '개인정보 수집 및 이용',
      isRequired: true,
      isChecked: false,
    },
    {
      id: 'minor',
      content: '본인은 만 14세 이상입니다.',
      isRequired: false,
      isChecked: false,
    },
    {
      id: 'sms',
      content: '이벤트 등 프로모션 알림 SMS 수신',
      isRequired: false,
      isChecked: false,
    },
    {
      id: 'mail',
      content: '이벤트 등 프로모션 알림 메일 수신',
      isRequired: false,
      isChecked: false,
    },
  ],
}
export default Vue.extend<typeof data>({
  layout: 'auth',
  data() {
    return {
      formData: {
        [inputName.nickname]: 'geuni',
        [inputName.email]: 'a@naver.com',
        [inputName.password]: 'test1234',
        [inputName.rePassword]: 'test1234',
      },
      formErrorMessage: {
        [inputName.nickname]: '',
        [inputName.email]: '',
        [inputName.password]: '',
        [inputName.rePassword]: '',
      },
      isAllChecked: false,
      checkedData: [
        {
          id: 'terms',
          content: '서비스 이용약관',
          isRequired: true,
          isChecked: false,
        },
        {
          id: 'Privacy',
          content: '개인정보 수집 및 이용',
          isRequired: true,
          isChecked: false,
        },
        {
          id: 'minor',
          content: '본인은 만 14세 이상입니다.',
          isRequired: false,
          isChecked: false,
        },
        {
          id: 'sms',
          content: '이벤트 등 프로모션 알림 SMS 수신',
          isRequired: false,
          isChecked: false,
        },
        {
          id: 'mail',
          content: '이벤트 등 프로모션 알림 메일 수신',
          isRequired: false,
          isChecked: false,
        },
      ],
    }
  },
  computed: {
    inputName: () => inputName,
    errorMsg() {
      const { formErrorMessage } = this
      return (name: keyof typeof inputName) => formErrorMessage[name]
    },
    getAllChecked(): boolean {
      return this.checkedData.every((row) => row.isChecked)
    },
    getAgreeList(): string {
      // 현재 체크 현황에서 체크된 요소는 1로 체크되지 않은 요소는 0으로
      return this.checkedData.reduce(
        (prev, curr) => prev + (curr.isChecked ? '1' : '0'),
        ''
      )
    },
  },
  methods: {
    async signupFlow() {
      try {
        const { email, password, nickname } = this.formData
        const payload: SignUpPayloadType = {
          email,
          password,
          name: nickname,
          agree: this.getAgreeList,
        }

        await this.$store.dispatch({
          type: ACTION.FETCH_SIGN_UP,
          payload,
        })

        this.$router.push('/auth/login')
      } catch (error) {
        openToast('warning', error.message)
      }
    },
    validate(name: string, value: string) {
      if (!value.length) {
        this.$set(this.formErrorMessage, name, '')
        return
      }

      const message = validateSignUp(name, value)

      this.$set(this.formErrorMessage, name, message)
    },
    handleInput(target: HTMLInputElement) {
      const { name, value } = target
      this.formData[name] = value
      this.validate(name, value)
    },
    handleAllCheck() {
      const isAllChecked = !this.isAllChecked
      this.isAllChecked = isAllChecked
      const newCheckedData = this.checkedData.map((row) => ({
        ...row,
        isChecked: isAllChecked,
      }))
      this.checkedData = newCheckedData
    },
    handleCheck(e: Event) {
      const target = e.target as HTMLInputElement
      const { id, checked } = target
      const targetIndex = this.checkedData.findIndex((row) => row.id === id)
      this.checkedData[targetIndex].isChecked = checked
      this.isAllChecked = this.getAllChecked
    },
    handleSubmit(e: Event) {
      this.signupFlow()
    },
  },
})
</script>

<style scoped lang="scss">
.text-field-wrapper {
  display: grid;
  row-gap: 1rem;
}

.password-rule {
  margin-top: 10px;
  font-size: 0.8rem;
  color: $font-color;
}

.error-message {
  padding: 6px 0 0 0;
  color: $font-color2;
  font-size: 0.8rem;
}

.checkbox-wrapper {
  display: grid;
  row-gap: 1rem;
}

.checkbox-wrapper .line-container {
  margin: 0;
}

.checkbox-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-field label {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
}

.checkbox-field label::before {
  content: '';
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0 5px 0 0;
  background: #fff;
  border: 1px solid #eee;
}

.checkbox-field input[type='checkbox'] {
  display: none;
}

// .checkbox-img {
//   display: inline-block;
//   width: 20px;
//   height: 20px;
//   background: url('https://s.wemep.co.kr/ui/v2.8.307/dist/pc/css/spr/common.png')
//     0 -438px no-repeat;
//   vertical-align: top;
// }

.checkbox-field input[type='checkbox']:checked + label::before {
  background: $bg-color;
  border-color: $bg-color;
}

.checkbox-field input[type='checkbox']:checked + label::after {
  content: '';
  width: 10px;
  height: 5px;
  border-width: 0 0 2px 2px;
  border-color: #fff;
  border-style: solid;
  position: absolute;
  transform: rotate(-45deg);
  position: absolute;
  left: 4px;
  top: 4px;
}
</style>
~/common/regexp
