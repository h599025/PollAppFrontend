<template>
    <!-- Top buttons -->
    <div class="button-group">
      <button class="btn">Logg ut</button>
    </div>
    <div class="user-container">
        <!-- Heading-->
        <h2>Min side, {{user.username}}!</h2>

        <!-- User Form -->
        <form @submit.prevent="submitForm" class="user-form">
            <div class="form-group">
                <label for="username">Brukernavn</label>
                <input v-model="user.username" id="username" />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" id="email" type="email" />
            </div>

            <div class="form-group">
                <label for="password">Passord</label>
                <input v-model="user.password" id="password" type="password" />
            </div>

            <div>
                <button type="submit" class="btn-submit">Lagre endringer</button>
            </div>
        </form>

        <!-- Polls Section -->
        <h2>Mine Polls:</h2>

        <div class="polls-section" v-if="polls.length">
            <div v-for="(poll, index) in polls" :key="index" class="poll-card">
                <h3>Spørsmål {{ index + 1 }}</h3>

                <div class="poll-item">
                    <label for="poll-question">Spørsmål:</label>
                    <input v-model="poll.question" required />
                </div>
                <label>Svar: </label>
                <div v-for="option in poll.voteOptions" :key="option.voteOptionId" class="option-item">
                  <div class="poll-item">
                      <input v-model="option.caption" />
                      <p>Stemmer: {{ option.votes.length}}</p>
                  </div>
                </div>
                <div class="poll-item">
                  <label for="deadline">Frist:</label>
                  <input type="datetime-local" v-model="poll.validUntil"/>
                </div>

                <button @click="updatePoll(index)" class="btn-submit">Lagre endring</button>
                <button @click="deletePoll(index)" class="btn-delete">Slett Poll</button>
            </div>
        </div>

        <!-- No polls fallback -->
        <div v-else>
            <p>Du har ingen polls opprettet.</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: sessionStorage.getItem('username'),
                email: sessionStorage.getItem('email'),
                password: sessionStorage.getItem('password'),
            },
            polls: []
        };
    },
    async created() {
      await this.fetchUserPolls();
    },
    methods: {
        async fetchUserPolls() {
          try {
            const response = await fetch('http://localhost:8080/polls'); // Adjust endpoint if needed
            const allPolls = await response.json();

            // Filter polls by creatorUsername
            this.polls = allPolls
                .filter(poll => poll.creatorUsername === this.user.username)
                .map(poll => ({
                  ...poll,
                  // Convert validUntil to "YYYY-MM-DDTHH:MM" for datetime-local input
                  validUntil: poll.validUntil ? poll.validUntil.slice(0, 16) : ''
                }));
          } catch (error) {
            console.error('Error fetching polls:', error);
          }
        },
        async submitForm() {
            try {
                const response = await fetch(`http://localhost:8080/users/${this.user.username}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.user)
                });

                if (response.ok) {
                    const updatedUser = await response.json();
                    alert('User updated successfully!');

                    sessionStorage.setItem('username', updatedUser.username);
                    this.$emit('user-updated', updatedUser);
                } else {
                    alert('Failed to update user.');
                }
            } catch (error) {
                alert('Failed to update user.');
            }
        },
        // Update Poll
        updatePoll(index) {
            alert(`Poll ${index + 1} has been updated!`);
            // Here, you'd typically send the updated poll data to the backend
        },
        // Delete Poll
        deletePoll(index) {
            this.polls.splice(index, 1);
            alert(`Poll ${index + 1} has been deleted!`);
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

.button-group {
    position: absolute;
    display: flex;
    top: 10px;
    left: 20px;
}

.btn,
.btn-submit,
.btn-delete {
    background-color: black;
    border: none;
    padding: 10px 15px;
    color: white;
    cursor: pointer;
    margin: 5px;
}

.btn-delete {
    background-color: red;
}

h2 {
    margin-bottom: 20px;
}

.user-form,
.poll-card {
    background-color: #444;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
}

.form-group,
.poll-item {
    margin-bottom: 5px;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: none;
}
</style>