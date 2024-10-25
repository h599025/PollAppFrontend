<template>
    <div class="user-container">

        <!-- Top buttons -->
        <div class="button-group">
            <button class="btn">Logg ut</button>
            <button class="btn">Tilbake</button>
        </div>

        <!-- Heading-->
        <h2>Min side, {{ user.username || '<user>' }}!</h2>

        <!-- User Form -->
        <form @submit.prevent="submitForm" class="user-form">
            <div class="form-group">
                <label for="firstName">Fornavn</label>
                <input v-model="user.firstName" id="firstName" placeholder="Fornavn" required />
            </div>

            <div class="form-group">
                <label for="lastName">Etternavn</label>
                <input v-model="user.lastName" id="lastName" placeholder="Etternavn" required />
            </div>

            <div class="form-group">
                <label for="username">Brukernavn</label>
                <input v-model="user.username" id="username" placeholder="Brukernavn" required />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" id="email" type="email" placeholder="Email" required />
            </div>

            <div class="form-group">
                <label for="password">Passord</label>
                <input v-model="user.password" id="password" type="password" placeholder="Passord" required />
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
                    <input v-model="poll.question" placeholder="Spørsmål" required />
                </div>

                <div class="poll-item">
                    <label for="answer1">Svar 1</label>
                    <input v-model="poll.answer1" placeholder="Svar 1" />
                    <p>Stemmer: {{ poll.votes1 }}</p>
                </div>

                <div class="poll-item">
                    <label for="answer2">Svar 2</label>
                    <input v-model="poll.answer2" placeholder="Svar 2" />
                    <p>Stemmer: {{ poll.votes2 }}</p>
                </div>

                <div class="poll-item">
                    <label for="deadline">Frist:</label>
                    <input type="date" v-model="poll.deadline" />
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
                firstName: '',
                lastName: '',
                username: 'TestUser123',
                email: '',
                password: '',
            },
            polls: [
                {
                    question: 'Spørsmål 1',
                    answer1: 'Svar 1',
                    answer2: 'Svar 2',
                    votes1: 0,
                    votes2: 0,
                    deadline: '',
                },
                {
                    question: 'Spørsmål 2',
                    answer1: 'Svar 1',
                    answer2: 'Svar 2',
                    votes1: 0,
                    votes2: 0,
                    deadline: '',
                }
            ]
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await fetch('http://localhost:8080/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.user)
                });

                if (response.ok) {
                    const createdUser = await response.json();
                    alert('User created successfully!');

                    sessionStorage.setItem('username', createdUser.username);
                    this.$emit('user-created', createdUser);
                } else {
                    alert('Failed to create user.');
                }
            } catch (error) {
                alert('Failed to create user.');
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
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
    margin-bottom: 15px;
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
    margin-bottom: 10px;
}
</style>