<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
          <a class="navbar-brand" href="">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                      <a class="nav-link" href="">Contact</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="">Pricing</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="">Download</a>
                  </li>
              </ul>
          </div>
      </div>
    </nav>

    <!-- weplay logo -->
    <img src="../assets/logo.png" alt="WePlay Logo" style="max-width: 20%; height: auto; margin: 20px;">

    <h1> Welcome to WePlay! </h1>
    <h2 v-if="user">Signed In User: {{ user }}</h2>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
    <br>
    <div v-if="isSignedIn">
      <button @click="handleSignOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import firebaseConfig from '../firebaseConfig';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig);import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  setup() {
    const user = ref(null);
    const isSignedIn = ref(false);

    const uiConfig = {
      signInFlow: 'popup',
      signinSuccessUrl: 'http://localhost:8080/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // Whether the display name should be displayed in Sign Up page.
          requireDisplayName: true,
          signInMethod: 'password',
          disableSignUp: {
            status: false
          }
        }
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          user.value = authResult.user.displayName;
          console.log(authResult)
          isSignedIn.value = true;
          console.log('Signed in by user ' + user.value);
 
          // so it doesn't refresh the page
          return false;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
          // Hide the email sign-in field
          document.getElementById('email-sign-in-container').style.display = 'none';
        }
      }
    }

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', uiConfig);

    const handleSignOut = () => {
      signOut(auth).then(() => {
       // Sign-out successful.
       user.value = null;
       isSignedIn.value = false;
       console.log('Signed out');
       ui.start('#firebaseui-auth-container', uiConfig);
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    }

    return {
      user,
      isSignedIn,
      handleSignOut
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
h1 {
  margin: 40px 0 40px;
  font-family: 'Press Start 2P';
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
