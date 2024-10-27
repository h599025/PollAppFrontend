<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Feed Applikasjon</h2>
      <h3>Logg inn</h3>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="username">Email</label>
          <input v-model="user.username" id="username" required placeholder="Email" />
        </div>

        <div class="input-group">
          <label for="password">Passord</label>
          <input v-model="user.password" id="password" type="password" required placeholder="Passord" />
        </div>

        <button type="submit">Logg inn</button>
        <button class="register-button" type="button" @click="$emit('navigate-to-create-user')">Registrer deg her</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        });

        if (response.ok) {
          const loggedInUser = await response.json();
          alert('Login successful!');

          sessionStorage.setItem('username', loggedInUser.username);
          this.$emit('login-success', loggedInUser);

        } else {
          alert('Failed to log in. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to log in.');
      }
    }
  }
};
</script>

<style scoped>
h2 {
  color: #ecf0f1;
  margin-bottom: 0.5rem;
}

h3 {
  color: #bdc3c7;
  margin-bottom: 1.5rem;
}

.login-box {
  background-color: #555555;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  color: #ecf0f1;
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

.register-button {
  background-color: #3498db;
}

.register-button:hover {
  background-color: #2980b9;
}
</style>
