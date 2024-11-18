<template>
  <div class="option-list">
    <h3>{{ title }}</h3>
    <div v-for="(option, index) in options" :key="index" class="option-item">
      <label :for="'option-' + index">Option {{ index + 1 }}:</label>
      <input
          v-model="option.caption"
          :id="'option-' + index"
          required
          placeholder="Enter option"
      />
      <button type="button" @click="removeOption(index)">Remove</button>
    </div>
    <button type="button" @click="addOption">Add Option</button>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, required: true },
    title: { type: String, default: 'Options' }
  },
  methods: {
    addOption() {
      this.options.push({ caption: '' });
    },
    removeOption(index) {
      this.options.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.option-item {
  margin-bottom: 1rem;
}
button {
  margin-left: 1rem;
}
</style>
