<template>
  <div class="row">
      <div class="col-lg-9">
          <!-- background video -->
            <video id="background-video" autoplay loop muted>
            <source src="../assets/backgroundvideo.mp4" type="video/mp4">
          </video>
    </div>
    <div class="col-lg-3" id="side-bar">
      <h1> Welcome to WePlay! </h1>
      <div id="login-container">
        <p>Sign in to get started!</p>
        <div id="firebaseui-auth-container"></div>
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
          <!-- Remember me checkbox -->
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="remember-me">
            <label class="form-check-label" for="flexSwitchCheckDefault">Remember me 😉</label>
          </div>
          <!-- note about using firebase -->
          <p style="font-size: 10px; margin-top: 10px; color:#9EB3C2">Note! User accounts are partially handled by Google Firebase, <br>
            read more: <a href="https://firebase.google.com/support/privacy" target="_blank">Firebase</a></p>
        </div>
        <div id="loader">Loading...</div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseConfig from '../firebaseConfig';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig);import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

import { onMounted, onBeforeUnmount } from 'vue';

import router from "@/router";

import axios from 'axios'

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  setup() {
    // if the user is logged in, redirect to dashboard
    const authListener = firebase.auth().onAuthStateChanged(function(user) {
        if (user) { // not logged in
            router.push('/dashboard')
        }
    })
    onBeforeUnmount(() => {
        authListener()
    })

    onMounted(() => {
      const uiConfig = {
      signInFlow: 'popup',
      // go to the dashboard page after signing in
      signinSuccessUrl: '/dashboard',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          // if the remember me switch is on
          if (document.getElementById('remember-me').checked) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
              // Signed in 
              // ...
            })
            .catch((error) => {
              console.log(error)
            });
          } else {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              // Signed in 
              // ...
            })
            .catch((error) => {
              console.log(error)
            });
          }

          // try to get the current user's data from the database
          axios.get('http://localhost:3000/api/users/' + authResult.user.uid).then((response) => {
            console.log(response)
          }).catch((error) => {
            console.log(error)
            // if it gives back an empty object
              // create a new user
              axios.post('http://localhost:3000/api/users', {
                "_id": authResult.user.uid,
                "name": authResult.user.displayName,
                "photoURL": authResult.user.photoURL
              }).then((response) => {
                console.log(response) 
              }).catch((error) => {
                console.log(error)
              })
          })

          console.log(authResult)
 
          // refresh the page or not
          return false;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none';
        }
      }
    }

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  margin: 0; /*avoids horizontal scroll*/
}
.transparent{
  color: #1F1F1F;
}

#background-video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}


#login-container {
  margin-top: 50%;
}
#side-bar{
  background-color: #1F1F1F;
  height: 100vh;
  padding: 20px;
  color: #F7D063;
}
p{
  font-family: 'Martian Mono';
}
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
