<template>
    <div>
        <TopBar />
    </div>
</template>
  
<script>

import TopBar from "@/components/TopBar.vue";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"; // Import Firebase authentication
import router from "@/router";
import { onBeforeUnmount } from "vue";


export default {
    components: {
        TopBar
    },
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
};
</script>
