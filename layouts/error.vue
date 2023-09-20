<template>
  <div class="container">
    <h1 v-if="error.satusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
import {ACTION} from "~/store";

export default {
  props: ['error'],

  async created() {
    const { error: { statusCode } } = this;
    // 401에러일 경우 재요청 시킨 다음에
    if (statusCode === 401) {
      try {
        const res = await this.$store.dispatch(ACTION.FETCH_REFRESH_TOKEN);
      } catch (error) {
        this.$store.dispatch(ACTION.LOGOUT);
      }
    }
  },
}
</script>

<style></style>
