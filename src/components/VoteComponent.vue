<template>
  <div class="vote">
    <h2>Vote on a Poll</h2>
    <div v-for="poll in polls" :key="poll.pollId" class="poll-item">
      <h3>{{ poll.question }}</h3>
      <div v-if="poll.voteOptions.length > 0">
        <div v-for="option in poll.voteOptions" :key="option.voteOptionId" class="option-item">
          <span>{{ option.caption }}</span>
          <button @click="vote(poll.pollId, option.voteOptionId)">
            Vote
          </button>
        </div>
      </div>
      <div v-else>
        <p>No options available for this poll.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      polls: [],
      username: ''  // Store the username dynamically
    };
  },
  async created() {
    // Retrieve the username from sessionStorage or set it to 'guest' if not found
    this.username = sessionStorage.getItem('username') || 'guest';  // Fallback to 'guest' if not found
    console.log("Username retrieved from sessionStorage:", this.username);

    const response = await fetch('http://localhost:8080/polls');
    const data = await response.json();
    console.log("Polls fetched:", data);  // Check if voteOptions are included
    this.polls = data;
  },
  methods: {
    async vote(pollId, voteOptionId) {
      console.log("username fetched:", this.username);
      const response = await fetch(`http://localhost:8080/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,  // Use the dynamically fetched username
          pollId: pollId,
          voteOptionId: voteOptionId,
          publishedAt: new Date().toISOString()  // Send the current time as the publishedAt value
        })
      });

      if (response.ok) {
        alert('Vote cast successfully!');
      } else if (response.status === 400) {
        alert('You have already voted on this poll!');
      } else {
        alert('Failed to cast vote.');
      }
    }
  }
};
</script>

<style scoped>
.poll-item {
  margin-bottom: 10px;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 40px;
}

.option-item button {
  padding: 5px 40px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.option-item button:hover {
  background-color: #0056b3;
}

.option-item span {
  font-size: 16px;
  margin-left: 80px;
}
</style>