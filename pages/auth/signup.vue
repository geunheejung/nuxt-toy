<template>
  <div class="wrapper">
    <!-- 상단 소셜 로그인 -->
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
    <div class="line-container">
      <div class="line"></div>
      <p>또는</p>
    </div>
    <form class="form-container">
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
          <span class="checkbox-img"></span>
          <label for="all-agree">아래 약관에 모두 동의합니다.</label>
        </div>
        <div class="line-container">
          <div class="line"></div>
        </div>
        <div v-for="item in checkedData" :key="item.id" class="checkbox-field">
          <input
            :id="item.id"
            type="checkbox"
            :checked="item.isChecked"
            :required="item.isRequired"
            :value="item.id"
            @click="handleCheck"
          />
          <span class="checkbox-img"></span>
          <label :for="item.id"
            >{{ item.content }} ({{ item.isRequired ? '필수' : '선택' }})
          </label>
        </div>
      </div>
      <div class="submit-container">
        <Button :type="'submit'"> 회원가입 </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
const inputName = {
  nickname: 'nickname',
  email: 'email',
  password: 'password',
  rePassword: 'rePassword',
} as const

export default {
  layout: 'auth',
  data() {
    return {
      formData: {},
      formErrorMessage: {},
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
      return function (name: keyof typeof inputName) {
        return this.formErrorMessage[name]
      }
    },
    getAllChecked() {
      return this.checkedData.every((row) => row.isChecked)
    },
  },
  created() {},
  methods: {
    updateErrorMessageTo(name: keyof typeof inputName, value = '') {
      this.$set(this.formErrorMessage, name, value)
    },
    validate(name: keyof typeof inputName, value: string) {
      const specialRegex = /[`~!@#$%^&*|\\\'\";:\/?]/gi
      const emailRegex =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/

      const _clear = () => this.updateErrorMessageTo(name, '')

      if (!value.length) {
        _clear()
        return
      }

      switch (name) {
        case 'nickname':
          if (value.length >= 2 && !specialRegex.test(value)) return _clear()
          return this.updateErrorMessageTo(
            name,
            '닉네임은 두 글자 이상(특수문자 입력 불가) 입력해주세요.'
          )
        case 'email':
          if (emailRegex.test(value)) return _clear()

          return this.updateErrorMessageTo(
            name,
            '이메일 형식이 유효하지 않습니다.'
          )
        default:
          break
      }
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
  },
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 640px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  box-sizing: border-box;
}

@media (max-width: 1000px) {
  .wrapper {
    width: 100%;
  }
}

.btn-wrapper {
  display: grid;
  row-gap: 16px;
}

.line-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin: 1rem 0;
}

.line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: #eee;
}

.line-container > p {
  z-index: 2;
  padding: 0 1rem;
  background: #fff;
}

.form-container {
  display: grid;
  row-gap: 32px;
}

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-field label {
}

.checkbox-field input[type='checkbox'] {
  display: none;
}

.checkbox-img {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('https://s.wemep.co.kr/ui/v2.8.307/dist/pc/css/spr/common.png')
    0 -438px no-repeat;
  vertical-align: top;
}

.checkbox-field input[type='checkbox']:checked + span {
  background-position: -75px -438px;
}
</style>
