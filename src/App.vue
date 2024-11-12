<template>
  <div class="app">
    <h1>Feed Applikasjon</h1>

    <!-- Show login or register component when not logged in -->
    <div v-if="!isLoggedIn">
      <component :is="currentView"
                 @login-success="handleLoginSuccess"
                 @navigate-to-create-user="navigateToCreateUser" />
    </div>

    <!-- Show user area when logged in -->
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

    <!-- Iframe for Angular CreateUserComponent when currentView is CreateUserComponent -->
    <div v-if="currentView === 'CreateUserComponent'">
      <iframe
          src="/angularComponent/create-user.html"
          width="100%"
          height="600px"
          @load="initializeCommunication"
      ></iframe>
    </div>
  </div>
</template>

<script>
import CreatePollComponent from './components/CreatePollComponent.vue';
import VoteComponent from './components/VoteComponent.vue';
import LogInComponent from "./components/LogInComponent.vue";
import UserComponent from "./components/UserComponent.vue";

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      createdUser: null,
      currentView: 'LogInComponent'  // Initially show the login view
    };
  },
  components: {
    CreatePollComponent,
    VoteComponent,
    LogInComponent,
    UserComponent
  },
  methods: {
    // Navigate to the Angular-based CreateUserComponent in iframe
    navigateToCreateUser() {
      this.currentView = 'CreateUserComponent';
    },

    // Handles successful login or user creation
    handleLoginSuccess(user) {
      this.isLoggedIn = true;
      this.createdUser = user;
      this.currentView = 'CreatePollComponent';  // Redirect to poll creation view after login
    },

    // Initialize communication with Angular component in iframe
    initializeCommunication() {
      window.addEventListener("message", (event) => {
        // Verify the origin to prevent security risks
        if (event.origin !== window.location.origin) return;

        if (event.data.type === "user-created") {
          this.handleUserCreated(event.data.user);
        }
      });
    },

    // Handle user creation event from Angular component
    handleUserCreated(user) {
      this.isLoggedIn = true;
      this.createdUser = user;
      this.currentView = 'CreatePollComponent';  // Navigate to poll creation after user creation
    },

    handleLogout() {
      this.isLoggedIn = false;
      this.createdUser = null;
      this.currentView = 'LogInComponent';  // Go back to login screen
    }
  }
};
</script>

<style scoped>
/* Styling for your navigation, buttons, and layout */
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
