<template>
  <div class="vote">
    <h2>Stem på en meningsmåling</h2>
    <div class="user-container">
      <div v-for="poll in polls" :key="poll.pollId" class="poll-card">
        <h3>{{ poll.question }}</h3>
        <div v-if="poll.voteOptions.length > 0">
          <div v-for="option in poll.voteOptions" :key="option.voteOptionId" class="option-item">
            <span>{{ option.caption }}</span>
            <button @click="vote(poll.pollId, option.voteOptionId, option.caption, option.presentationOrder)">
              Vote
            </button>
            <button @click="deleteVote (poll.pollId, option.voteOptionId)">
              Fjern
            </button>
            <p>Stemmer: {{option.votes.length}}</p>
          </div>
        </div>
        <div v-else>
          <p>No options available for this poll.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      polls: [],
      username: ''
    };
  },
  async created() {
    //this.username = sessionStorage.getItem('username');
    this.username = this.user.username;
    console.log("Username retrieved from sessionStorage:", this.username);

    const response = await fetch('http://localhost:8080/polls');
    const data = await response.json();
    console.log("Polls fetched:", data);
    this.polls = data;
  },
  methods: {
    async vote(pollId, voteOptionId, caption, presentationOrder) {
      //const responseVote = await fetch(`http://localhost:8080/votes/${voteOptionId}`, {
      //  method: 'GET',
      //})

      //responseVote = await responseVote.json();
      //console.log("vote: " + responseVote)

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
      })

      //responseVoteOnPoll = await responseVoteOnPoll.json();
      //console.log("response:" + responseVoteOnPoll)
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
        //const responseData = await response.json();
        //console.log("Response data:", responseData);
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
        // Optionally, you can refresh the polls or update the UI here.
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
  flex: 1; /* Allows the text to occupy available space */
  text-align: left; /* Aligns the text to the left */
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
  margin: 0; /* Remove default margins */
  font-size: 16px;
  text-align: right;
  width: 80px; /* Set a fixed width to accommodate "Stemmer: XX" */
  white-space: nowrap;
}
</style>