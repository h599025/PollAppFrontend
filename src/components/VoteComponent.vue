<template>
  <div class="vote">
    <h2>Vote on Polls</h2>
    <div class="poll-container">
      <PollCard
          v-for="poll in polls"
          :key="poll.pollId"
          :poll="poll"
          @vote="vote"
          @delete-vote="deleteVote"
      />
    </div>
  </div>
</template>

<script>
import PollCard from './PollCard.vue';

export default {
  props: ['user'],
  components: {
    PollCard
  },
  data() {
    return {
      polls: [],
      username: ''
    };
  },
  async created() {
    // Use user prop to set the username
    this.username = this.user.username;
    console.log("Username retrieved from props:", this.username);

    // Fetch polls
    const response = await fetch('http://localhost:8080/polls');
    const data = await response.json();
    console.log("Polls fetched:", data);
    this.polls = data;
  },
  methods: {
    async vote(pollId, voteOptionId, caption, presentationOrder) {
      console.log("username fetched:", this.username);
      const responseVoteOnPoll = await fetch(`http://localhost:8080/votes/voteOptions/${voteOptionId}/polls/${pollId}/users/${this.username}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          pollId: pollId,
          voteOption: {
            pollId: pollId,
            caption: caption,
            presentationOrder: presentationOrder
          },
          publishedAt: new Date(Date.now()).toISOString()
        })
      });

      if (responseVoteOnPoll.ok) {
        const response = await fetch('http://localhost:8080/polls');
        const data = await response.json();
        console.log("Polls fetched:", data);
        this.polls = data;
        alert('Vote cast successfully!');
      } else if (responseVoteOnPoll.status === 400) {
        alert('You have already voted on this poll!');
      } else {
        alert('Failed to cast vote. ' + responseVoteOnPoll);
      }
    },

    async deleteVote(pollId, voteOptionId) {
      console.log("Attempting to delete vote for user:", this.username);

      const checkIfHaveVotedResponse = await fetch(`http://localhost:8080/votes/polls/${pollId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const checkIfHaveVotedResponseData = await checkIfHaveVotedResponse.json();

      let haveVoted = false;
      let voteId = -5;
      for (let i = 0; i < checkIfHaveVotedResponseData.length; i++) {
        if (checkIfHaveVotedResponseData[i].username === this.username) {
          console.log("Vote found for user:", this.username);
          haveVoted = true;
          voteId = checkIfHaveVotedResponseData[i].voteId;
          break;
        }
      }

      if (haveVoted) {
        const response = await fetch(`http://localhost:8080/votes/${voteId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            pollId: pollId,
            voteOptionId: voteOptionId
          })
        });

        if (response.ok) {
          const response = await fetch('http://localhost:8080/polls');
          const data = await response.json();
          console.log("Polls fetched:", data);
          this.polls = data;
          alert('Vote removed successfully!');
        } else if (response.status === 404) {
          alert('You have not voted on this option yet.');
        } else {
          alert('Failed to remove vote.');
        }
      }
    },

    async getVotesForVoteOption(pollId, voteOptionId) {
      const response = await fetch(`http://localhost:8080/voteOptions`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          pollId: pollId,
          voteOptionId: voteOptionId
        })
      });

      if (response.ok) {
        alert('Vote removed successfully!');
      } else if (response.status === 404) {
        alert('You have not voted on this option yet.');
      } else {
        alert('Failed to remove vote.');
      }
    }
  }
};
</script>


<style scoped>
.user-container {
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.poll-card {
  background-color: #444;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
}

.option-item span {
  flex: 1;
  text-align: left;
  margin: 0;
  font-size: 16px;
}

.option-item button {
  padding: 8px 16px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.option-item button:hover {
  background-color: #0056b3;
}

.option-item p {
  margin: 0;
  font-size: 16px;
  text-align: right;
  width: 80px;
  white-space: nowrap;
}
</style>