<template>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #1F1F1F;">
        <a class="navbar-brand" id="weyellow" href="/"><img src="../assets/Weyellow.png" alt="WePlay Yellow" width="153"
                height="153"></a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="/squads">Squads</a></li>
                <li class="nav-item"><a class="nav-link" href="/clans">Clans</a></li>
                <li class="nav-item"><a class="nav-link" href="/games">Games</a></li>
                <li class="nav-item"><a class="nav-link" href="/friends">Friends</a></li>
            </ul>
        </div>
    </nav>
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

        const authListener = firebase.auth().onAuthStateChanged(function (user) {
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

<style scoped>
.navbar {
    height: 130px;
}

.nav-link {
    text-decoration: none;
    color: #9EB3C2;
    text-align: left;
    font-family: Martian Mono Condensed;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
}

.navbar-nav {
    gap: 40px;
}
</style>