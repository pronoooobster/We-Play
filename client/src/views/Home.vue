<template>
  <div>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import { ref } from 'vue'
import firebaseConfig from '../firebaseConfig'

// v9 firebase
import firebase from 'firebase/compat/app'

import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

firebase.initializeApp(firebaseConfig)

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  },
  setup() {
    const user = ref(null)
    const isSignedIn = ref(false)

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.

          user.value = authResult.user
          console.log(user.value.displayName)
          isSignedIn.value = true

          return true
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById('loader').style.display = 'none'
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>'
    }

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth())

    ui.start('#firebaseui-auth-container', uiConfig)

    return {
      user,
      isSignedIn
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
