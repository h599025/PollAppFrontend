<template>
  <div class="button-group">
    <button @click="currentView = 'UserComponent'">Min Side</button>
  </div>
  <div id="app">
    <h1>Feed Applikasjon</h1>

    <div v-if="!isLoggedIn">
      <component :is="currentView"
                 @login-success="handleLoginSuccess"
                 @navigate-to-create-user="currentView = 'CreateUserComponent'"
                 @user-created="handleLoginSuccess" />
    </div>
    <div v-else>
      <div class="greeting">
        <strong>Hei, {{ createdUser.username }}!</strong>
      </div>
      <nav>
        <button @click="currentView = 'CreatePollComponent'">Meningsmåling</button>
        <button @click="currentView = 'VoteComponent'">Stem</button>
      </nav>
      <component
        :is="currentView"
        :user="createdUser"
        @logout="handleLogout"  
      />
    </div>
  </div>
</template>

<script>
import CreatePollComponent from './components/CreatePollComponent.vue';
import VoteComponent from './components/VoteComponent.vue';
import CreateUserComponent from './components/CreateUserComponent.vue';
import LogInComponent from "./components/LogInComponent.vue";
import UserComponent from "./components/UserComponent.vue";

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
    LogInComponent,
    UserComponent
  },
  methods: {
    handleLoginSuccess(user) {
      this.isLoggedIn = true;
      this.userCreated = true;
      this.createdUser = user;
      this.currentView = 'CreatePollComponent';
    },
    handleLogout() {
      this.isLoggedIn = false;
      this.createdUser = null;
      this.currentView = 'LogInComponent';
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

.button-group {
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
}
</style>