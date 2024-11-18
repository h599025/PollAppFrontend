<template>
  <div class="create-poll">
    <h2>Create a New Poll</h2>
    <form @submit.prevent="createPoll">
      <FormField label="Question:" id="question" v-model="poll.question" />
      <FormField label="Valid Until:" id="validUntil" v-model="poll.validUntil" type="datetime-local" />

      <OptionList :options="poll.options" title="Options" />

      <button type="submit" class="submit-button">Publish Poll</button>
    </form>
  </div>
</template>

<script>
import FormField from './FormField.vue';
import OptionList from './OptionList.vue';

export default {
  components: { FormField, OptionList },
  props: ['user'],
  data() {
    return {
      poll: {
        question: '',
        options: [{ caption: '' }],
        validUntil: '',
        creatorUsername: this.user.username
      }
    };
  },
  methods: {
    async createPoll() {
      try {
        const pollData = {
          question: this.poll.question,
          validUntil: new Date(this.poll.validUntil).toISOString(),
          creatorUsername: this.poll.creatorUsername
        };

        console.log('Sending poll data:', pollData);

        const pollResponse = await fetch('http://localhost:8080/polls', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(pollData)
        });

        if (!pollResponse.ok) throw new Error('Failed to create poll');

        const createdPoll = await pollResponse.json();

        console.log('Created poll:', createdPoll);

        // Add options to the created poll
        for (let i = 0; i < this.poll.options.length; i++) {
          const option = this.poll.options[i];
          const optionData = {
            pollId: createdPoll.pollId,
            caption: option.caption,
            presentationOrder: i + 1
          };

          console.log('Sending option data:', optionData);

          const optionResponse = await fetch(`http://localhost:8080/voteOptions/polls/${optionData.pollId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(optionData)
          });

          if (!optionResponse.ok) throw new Error('Failed to create option');
          console.log('Option created successfully');
        }

        alert('Poll created successfully!');
        this.resetForm();
      } catch (error) {
        console.error(error);
        alert('Failed to create poll or options.');
      }
    },
    resetForm() {
      this.poll.question = '';
      this.poll.options = [{caption: ''}];
      this.poll.validUntil = '';
    }
  }
};
</script>

<style scoped>
.create-poll {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #444;
  color: white;
  border-radius: 8px;
}

.submit-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
