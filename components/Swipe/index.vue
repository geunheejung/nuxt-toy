<template>
  <div class="swipe-btn-wrapper">
    <input :id="id" type="checkbox" />
    <label class="radio-btn" :value="value" :for="id" @click="handleClick" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: String,
    id: String,
  },
  methods: {
    handleClick() {
      this.$emit('onSwipe', this.value)
    },
  },
})
</script>

<style scoped lang="scss">
.swipe-btn-wrapper label {
  position: relative;
  display: block;
  width: 40px;
  height: 24px;
  background: $bg-color2;
  border-radius: 13px;
  cursor: pointer;
  transition: all 0.5s;
}

.swipe-btn-wrapper input {
  display: none;
}

.swipe-btn-wrapper label::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  transform: translateX(3px);
  width: 19px;
  height: 19px;
  margin: auto 0;
  border-radius: 50%;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.06), 0 3px 8px 0 rgba(0, 0, 0, 0.15);
  border: 0.5px solid rgba(0, 0, 0, 0.04);
  background-color: #fff;
  transition: all 0.5s;
}

.swipe-btn-wrapper input:checked + label {
  background: $bg-color3;
}
.swipe-btn-wrapper input:checked + label::before {
  transform: translateX(calc(40px - 22px));
  transition: all 0.5s;
}
</style>
