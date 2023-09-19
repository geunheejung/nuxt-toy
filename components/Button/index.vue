<template>
  <button
    :class="['btn-container', styleType, color]"
    :type="type"
    @click="handleClick"
  >
    <slot name="icon">
      <div class="icon"></div>
    </slot>
    <div class="content">
      <slot name="default"></slot>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    size: String,
    styleType: String,
    type: String,
    color: String,
    disabled: Boolean,
  },
  methods: {
    handleClick(e: Event) {
      this.$emit('onClick')
    },
  },
})
</script>

<style scoped lang="scss">
.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid $border-color;
  cursor: pointer;
}

.btn-container.default {
  background-color: $bg-color2;
}

.btn-container.submit {
  background-color: $bg-color;
  border: none;
  border-radius: 0;
}

.btn-container.active {
  background-color: $bg-color3;
  font-weight: bold;
}

.btn-container.small {
  font-size: 0.75rem;
  padding: 0 0.5rem;
}

.btn-container.middle {
  height: 24px;
  padding: 0 4px;
  box-sizing: border-box;
}

.btn-container.basic {
  border-color: $border-color2;
  color: $font-color;
}

.btn-container.purple {
  border-color: #704de4;
  color: #704de4;
  background: #fff;
}

.btn-container.white {
  border-color: #fff;
  color: #fff;
  background: inherit;
}

.icon {
  // margin: 0 0.5rem 0 0;
}
</style>
