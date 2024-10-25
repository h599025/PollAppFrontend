<template>
  <div id="app">
    <h1>Poll Application</h1>

    <div v-if="!isLoggedIn">
      <component :is="currentView"
                 @login-success="handleLoginSuccess"
                 @navigate-to-create-user="currentView = 'CreateUserComponent'"
                 @user-created="handleUserCreated" />
    </div>

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
import LogInComponent from "./components/LogInComponent.vue";

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      userCreated: false,
      createdUser: null,
      currentView: 'LogInComponent'
    };
  },
  components: {
    CreatePollComponent,
    VoteComponent,
    CreateUserComponent,
    LogInComponent
  },
  methods: {
    handleLoginSuccess(user) {
      this.isLoggedIn = true;
      this.userCreated = true;
      this.createdUser = user;
      this.currentView = 'CreatePollComponent';
    },
    handleUserCreated(user) {
      this.userCreated = true;
      this.createdUser = user;
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