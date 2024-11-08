<template>
  <div class="create-user-container">
    <div class="create-user-box">
      <h2>Registrer deg</h2>
      <form @submit.prevent="submitForm">

        <div class="input-group">
          <label for="firstname">Fornavn:</label>
          <input v-model="user.firstName" id="firstname" required placeholder="Fornavn" />
        </div>

        <div class="input-group">
          <label for="lastname">Etternavn:</label>
          <input v-model="user.lastName" id="lastname" required placeholder="Etternavn" />
        </div>

        <div class="input-group">
          <label for="username">Brukernavn:</label>
          <input v-model="user.username" id="username" required placeholder="Brukernavn" />
        </div>

        <div class="input-group">
          <label for="email">Email:</label>
          <input v-model="user.email" id="email" type="email" required placeholder="Email" />
        </div>

        <div class="input-group">
          <label for="password">Passord:</label>
          <input v-model="user.password" id="password" type="password" required placeholder="Passord" />
        </div>

        <button type="submit">Registrer deg</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:8080/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        });

        if (response.ok) {
            const createdUser = await response.json();
            alert('User created successfully!');
            this.$emit('user-created', this.user);
          } else {
            alert('User created successfully, but no response data received.');
          }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user. Error: ' + error.message);
      }
    }
  }
};
</script>

<style scoped>
.create-user-box {
  background-color: #555555;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
}

h2 {
  color: #ecf0f1;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  color: #000000;
  margin-bottom: 0.5rem;
  text-align: left;
}

input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  background-color: #ecf0f1;
  color: #1a1a1a;
}

button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #1abc9c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #16a085;
}
</style>
