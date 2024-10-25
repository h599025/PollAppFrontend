<template>
  <div class="create-poll">
    <h2>Lag en ny meningsmåling</h2>
    <form @submit.prevent="createPoll">
      <label for="question">Spørsmål:</label>
      <input v-model="poll.question" id="question" required />
      <label for="validUntil">Gyldig til:</label>
      <input v-model="poll.validUntil" type="datetime-local" id="validUntil" required />

      <h3>Valgmuligheter</h3>
      <div v-for="(option, index) in poll.options" :key="index">
        <label :for="'option-' + index">Valg {{ index + 1 }}:</label>
        <input v-model="option.caption" :id="'option-' + index" required />
        <button type="button" @click="removeOption(index)">Fjern</button>
      </div>

      <button type="button" @click="addOption">Legg til valgmulighet</button>
      <button type="submit">Publiser meningsmåling</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      poll: {
        question: '',
        options: [{ caption: '' }],
        publishedAt: '',
        validUntil: '',
        creatorUsername: this.user.username
      }
    };
  },
  methods: {
    addOption() {
      this.poll.options.push({caption: ''});
    },
    removeOption(index) {
      this.poll.options.splice(index, 1);
    },
    async createPoll() {

      const pollData = {
        question: this.poll.question,
        publishedAt: new Date(Date.now()).toISOString(),
        validUntil: new Date(this.poll.validUntil).toISOString(),
        voteOptions: this.poll.options,
        creatorUsername: this.poll.creatorUsername
      };

      console.log("Poll data to be sent:", pollData);

      const response = await fetch('http://localhost:8080/polls', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pollData)
      });

      const pollResponse = await response.json();
      if (response.ok) {
        alert('Poll created successfully!');
        console.log("Poll created:", pollResponse);
        this.poll.question = '';
        this.poll.options = [{caption: ''}];
      } else {
        console.error('Failed to create poll:', pollResponse);
        alert('Failed to create poll.');
      }
    }
  }
};
</script>
<style scoped>
.form-group {
  display: inline-block;
  margin-right: 15px;
}


.form-group label {
  margin-right: 10px;
}


label[for="publishedAt"],
label[for="validUntil"] {
  margin-left: 20px;
}
</style>