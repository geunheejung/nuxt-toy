<template>
  <div :class="['text-input-container', className]">
    <label :for="name">{{ name }}</label>
    <input
      :value="inputValue"
      type="text"
      class="text-input"
      :name="name"
      :placeholder="placeholder"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    className: String,
    name: String,
    placeholder: String,
    inputValue: String,
  },
  methods: {
    handleInput(e: Event) {
      const target = e.target as HTMLInputElement

      this.$emit('onInput', target)
    },
  },
}
</script>

<style lang="scss" scoped>
.text-input-container {
  display: flex;
  height: 40px;
  border: 1px solid #eee;
  background-color: #fff;
}

.text-input-container label {
  display: none;
  width: 0;
  height: 0;
}
.text-input-container input {
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  border: none;
}

.text-input-container input:focus {
  outline: none;
}

.text-input-container input::placeholder {
  color: $font-color;
}
</style>
