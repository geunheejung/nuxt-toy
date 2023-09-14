<template>
  <div class="auth-layout">
    <h1 class="title">{{ title }}</h1>
    <div class="wrapper">
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    title() {
      const {
        $route: { name },
      } = this
      return name === 'auth-signup' ? '회원가입' : '로그인'
    },
  },
})
</script>

<style lang="scss">
.auth-layout {
  background-color: $bg-color2;
  height: calc(100vh);
  padding: 1.875rem 0 7.5rem 0;
}

@media (max-width: 1000px) {
  .auth-layout > .wrapper {
    width: 100%;
  }
}

.auth-layout > .title {
  padding: 7.5rem 0 1.25rem 0;
  font-size: 2.125rem;
  text-align: center;
}

.auth-layout > .wrapper {
  width: 640px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  box-sizing: border-box;
}

.auth-grid {
  display: grid;
  row-gap: 1rem;
}

.auth-grid .form-container {
  display: grid;
  row-gap: 32px;
}

.auth-grid .btn-wrapper {
  display: grid;
  row-gap: 16px;
}
</style>
