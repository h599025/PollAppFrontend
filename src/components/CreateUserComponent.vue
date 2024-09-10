<template>
  <div class="create-user">
    <h2>Create User</h2>
    <form @submit.prevent="submitForm">
      <label for="username">Username:</label>
      <input v-model="user.username" id="username" required />

      <label for="email">Email:</label>
      <input v-model="user.email" id="email" type="email" required />

      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        email: ''
      }
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

          // Store the username in sessionStorage after creation
          sessionStorage.setItem('username', createdUser.username);
          console.log('Username stored in sessionStorage:', createdUser.username);

          this.$emit('user-created', createdUser);  // Emit the user-created event with the user data
        } else {
          alert('Failed to create user.');
        }
      } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user.');
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>