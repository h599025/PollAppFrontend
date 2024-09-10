<template>
  <div id="app">
    <h1>Poll Application</h1>

    <!-- Show the Create User page if no user has been created -->
    <div v-if="!userCreated">
      <CreateUserComponent @user-created="handleUserCreated" />
    </div>

    <!-- Show the main app if the user is created -->
    <div v-else>
      <div class="greeting">
        <strong>Hello, {{ createdUser.username }}!</strong>
      </div>
      <nav>
        <button @click="currentView = 'CreatePollComponent'">Create Poll</button>
        <button @click="currentView = 'VoteComponent'">Vote</button>
      </nav>
      <component :is="currentView" :user="createdUser" />
    </div>
  </div>
</template>

<script>
import CreatePollComponent from './components/CreatePollComponent.vue';
import VoteComponent from './components/VoteComponent.vue';
import CreateUserComponent from './components/CreateUserComponent.vue';

export default {
  name: 'App',
  data() {
    return {
      userCreated: false,  // Track if the user has been created
      createdUser: null,   // Store the created user details
      currentView: 'CreatePollComponent'  // Default view is Create Poll
    };
  },
  components: {
    CreatePollComponent,
    VoteComponent,
    CreateUserComponent
  },
  methods: {
    handleUserCreated(user) {
      this.userCreated = true;
      this.createdUser = user;  // Store the user object and switch to the two-page layout
    }
  }
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}
button {
  margin-right: 10px;
}
.greeting {
  margin-bottom: 20px;
  font-size: 1.2em;
}
</style>