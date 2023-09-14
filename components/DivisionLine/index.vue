<template>
  <div class="line-wrapper">
    <div class="line"></div>
    <p v-if="text">{{ text }}</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DivisionLine',
  props: {
    text: String,
  },
})
</script>

<style scoped lang="scss">
.line-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.line-wrapper .line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: #eee;
}

.line-wrapper > p {
  z-index: 2;
  padding: 0 1rem;
  background: #fff;
}
</style>
