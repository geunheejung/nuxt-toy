<template>
  <div>
    <template v-if="user">
      <div>
        <NuxtLink to="profile">프로필</NuxtLink>
        <NuxtLink to="auth/login">로그아웃</NuxtLink>
      </div>
    </template>
    <template v-else>
      <NuxtLink to="auth/login">로그인</NuxtLink>
    </template>
  </div>
</template>

<script lang="ts">
// lang=ts -> 웹팩으로 빌드할 때 vue-loader가 타입스크립트 코드를 이해하고 해석하기 위함
import Vue from 'vue'
import { mapState } from 'vuex'

// 타입스크립트 코드가 뷰의 속성들과 함께 정상적으로 동작함.
export default Vue.extend({
  name: 'IndexPage',
  computed: {
    ...mapState(['user']),
  },
})
</script>
