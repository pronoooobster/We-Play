<template>
    <div class="top-bar">
        <div class="logo">
            <img src="../assets/Weyellow.png" alt="WePlay Yellow">
        </div>
        <div class="menu">
            <ul>
                <li><a href="/squads">Squads</a></li>
                <li><a href="/clans">Clans</a></li>
                <li><a href="/games">Games</a></li>
                <li><a href="/friends">Friends</a></li>
            </ul>
        </div>
    </div>
    <div>
        <h1 v-if="user">Welcome, {{ user.displayName }}</h1>
        <button @click="signOut">Sign Out</button>
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
.top-bar {
    background-color: #1F1F1F;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    margin-bottom: 720px;
    width: align-self;
    height: 112px;
    flex-shrink: 0;
}

.logo img {
    max-height: 153px;
    max-width: 153px;
    box-sizing: border-box;
    margin-right: 10px;
}

.menu ul {
    list-style: none;
    display: flex;
    gap: 45px;
    margin-right: auto;
    margin-bottom: 41px;
    margin-top: 41px;
    margin-right: 2300px;
}

.menu a {
    text-decoration: none;
    width: 89px;
    height: 30px;
    color: #9EB3C2;
    text-align: left;
    font-family: Martian Mono Condensed;
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

}
</style>