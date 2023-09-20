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
    if (statusCode === 401) {
      try {
        await this.$store.dispatch(ACTION.FETCH_REFRESH_TOKEN);
        
      } catch (error) {
        console.log('error ->', error);
        await this.$store.dispatch(ACTION.LOGOUT);
      }
    }
  },
}
</script>

<style></style>
