<template>
  <button
    :class="['btn-container', styleType]"
    :type="type"
    @click="handleClick"
  >
    <div class="icon">
      <slot name="icon"> </slot>
    </div>
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
  min-width: 130px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #fff;
  border-radius: 3px;
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

.icon {
  margin: 0 0.5rem 0 0;
}
</style>
