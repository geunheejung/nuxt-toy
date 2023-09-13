<template>
  <Tutorial />
</template>

<script lang="ts">
// lang=ts -> 웹팩으로 빌드할 때 vue-loader가 타입스크립트 코드를 이해하고 해석하기 위함
import Vue from 'vue'

// 타입스크립트 코드가 뷰의 속성들과 함께 정상적으로 동작함.
export default Vue.extend({
  name: 'IndexPage',
  created() {
    console.log(this.$store)
  },
})
</script>
