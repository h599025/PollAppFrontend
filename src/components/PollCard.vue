<template>
  <div class="poll-card">
    <h3>{{ poll.question }}</h3>
    <div v-if="poll.voteOptions.length > 0">
      <div v-for="option in poll.voteOptions" :key="option.voteOptionId" class="option-item">
        <span>{{ option.caption }}</span>
        <button @click="$emit('vote', poll.pollId, option.voteOptionId)">Vote</button>
        <button @click="$emit('delete-vote', poll.pollId, option.voteOptionId)">Remove</button>
        <p>Votes: {{ option.votes.length }}</p>
      </div>
    </div>
    <div v-else>
      <p>No options available for this poll.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    poll: { type: Object, required: true }
  }
};
</script>

<style scoped>
.poll-card {
  background-color: #444;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.option-item {
  display: flex;
  justify-content: space-between;
}
</style>
