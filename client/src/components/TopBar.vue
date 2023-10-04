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

        <!-- google profile picture image with sign out option -->
        <div v-if="user" class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img v-if="user.photoURL" :src="user.photoURL" alt="Profile Picture" class="profile-img" width="50" height="50">
                <img v-else src="../assets/default-profile.png" alt="Profile Picture" class="profile-img" width="50" height="50">
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="/dashboard">Dashboard</a></li>
                <li><a class="dropdown-item" href="/profile">Profile</a></li>
                <li><a class="dropdown-item" href="#" @click="signOut">Sign Out</a></li>
            </ul>
        </div>

    </nav>
</template>

<script>

// import firebase from "firebase/compat/app";
import { getAuth, signOut as firebaseSignOut } from "firebase/auth"; // Import Firebase authentication
import router from "@/router";

// import { onBeforeUnmount } from "vue";

export default {
    name: 'TopBar',

    data() {
        return {
            user: null,
        }
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
                    router.push("/"); // Redirect to the login page after sign out
                })
                .catch(error => {
                    console.error("Error signing out:", error);
                });
        }
    }
}

</script>

<style>
.navbar {
    height: 130px;
}

.nav-link {
    text-decoration: none;
    color: #9EB3C2;
    text-align: left;
    font-family: 'Martian Mono';
    font-size: 24px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
}

.profile-img {
    border-radius: 30%;
    margin: 5%;
}

.dropdown {
    margin: 3%;
    background-color: transparent;
}

.dropdown-toggle {
    background-color: transparent;
    border: none;
}

.dropdown-menu {
    margin: 5%;
}

.dropdown-item {
    font-family: 'Martian Mono';
}

.navbar-nav {
    gap: 40px;
}
</style>