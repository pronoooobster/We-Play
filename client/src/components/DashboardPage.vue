<template>
    <div>
        <h1 v-if="user">Welcome, {{ user.displayName }}</h1>
        <button type="button" class="btn btn-primary" @click="signOut">Sign Out</button>
    </div>
</template>
  
<script>

import firebase from "firebase/compat/app";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth"; // Import Firebase authentication
import router from "@/router";
import { onBeforeUnmount } from "vue";


export default {
    data() {
        return {
            user: null
        };
    },
    setup() {
        let userInfo

        const authListener = firebase.auth().onAuthStateChanged(function(user) {
            if (!user) { // not logged in
                router.push('/')
            } else {
                userInfo = user
                console.log(userInfo)
            }
        })
        onBeforeUnmount(() => {
            authListener()
        })
    },
    created() {
        const auth = getAuth(); // Get the authentication instance

        // Listen for Firebase authentication state changes
        auth.onAuthStateChanged(user => {
            this.user = user;
        });
    },
    methods: {
        signOut() {
            const auth = getAuth(); // Get the authentication instance

            firebaseSignOut(auth)
            .then(() => {
                this.$router.push("/"); // Redirect to the login page after sign out
            })
            .catch(error => {
                console.error("Error signing out:", error);
            });
        }
    }
};
</script>
