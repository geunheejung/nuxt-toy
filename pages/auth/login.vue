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
    <DivisionLine />
    <form class="form-container" @submit.prevent="handleSubmit">
      <TextField
        :name="'email'"
        :input-value="email"
        :type="'email'"
        :placeholder="'이메일'"
        @onInput="handleInput"
      />
      <TextField
        :name="'password'"
        :input-value="password"
        :type="'password'"
        :placeholder="'패스워드'"
        @onInput="handleInput"
      />
      <div class="submit-container">
        <Button :style-type="'submit'" :type="'submit'"> 로그인 </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { LoginPayloadType } from '../../api/member'
import { ACTION } from '../../store'

const data = {
  email: '',
  password: '',
}

export default Vue.extend({
  layout: 'auth',
  data() {
    return data
  },
  methods: {
    validate() {
      return true
    },
    async loginFlow() {
      const { email, password } = this
      const payload: LoginPayloadType = {
        email,
        password,
      }

      await this.$store.dispatch({ type: ACTION.FETCH_LOGIN, payload })
      await this.$store.dispatch({ type: ACTION.FETCH_GET_USER })
      this.$router.replace('/')
    },
    handleInput(target: HTMLInputElement) {
      const { name, value } = target
      const key = name as 'email' | 'password'
      this[key] = value
    },
    handleSubmit() {
      this.loginFlow()
    },
  },
})
</script>

<style lang="scss"></style>
