<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    id: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    modelValue: [String, Number]
  }
};
</script>

<style scoped>
.form-field {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  color: white;
}
input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
}
</style>
