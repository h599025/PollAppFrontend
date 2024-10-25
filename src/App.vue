<template>
  <div id="app">
    <h1>Feed Applikasjon</h1>

    <div v-if="!userCreated">
      <CreateUserComponent @user-created="handleUserCreated" />
    </div>

    <div v-else>
      <div class="greeting">
        <strong>Hei, {{ createdUser.username }}!</strong>
      </div>
      <nav>
        <button @click="currentView = 'CreatePollComponent'">Meningsmåling</button>
        <button @click="currentView = 'VoteComponent'">Stem</button>
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
      userCreated: false,
      createdUser: null,
      currentView: 'CreatePollComponent'
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