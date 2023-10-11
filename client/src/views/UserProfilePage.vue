<template>
    <TopBar />
    <div class="container-md" id="box">
        <div id="component" class="container-fluid py-3">
            <h1 class="text-center" id="my-profile">MY PROFILE</h1>
            <div class="bg-dark rounded-4" id="box">
                <img v-if="user.photoURL" :src="user.photoURL" alt="Profile Picture" class="big-picture">
                <div class="data">
                    <div class="row">
                        <div class="col-sm-2">
                            <p>Display Name</p>
                            <p>Email</p>
                            <p>Clan</p>
                            <p>Friends</p>
                        </div>
                        <div class="col-sm-3">
                            <p> {{ user.displayName }}</p>
                            <p> {{ user.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/compat/app";
import TopBar from "@/components/TopBar.vue";
import { getAuth } from "firebase/auth";
import { onBeforeUnmount } from "vue";

export default {
    components: {
        TopBar
    },
    data() {
        return {
            user: null,
        };
    },
    setup() {
        let userInfo;

        const authListener = firebase.auth().onAuthStateChanged(function (user) {
            userInfo = user
            console.log(userInfo)
        })
 
        onBeforeUnmount(() => {
            authListener();
        })

    },
    created() {
        const auth = getAuth(); // Get the authentication instance

        auth.onAuthStateChanged(user => { //getting the user information
            this.user = user;
        });
    },

    name: 'UserProfilePage'
}



</script>
<style>
    .big-picture {
        width: 200px;
        height: 200px;
        flex-shrink: 0;
        margin-top: 30px;
        box-sizing: border-box;
        border-radius: 20px;
    }
    .data {
        margin-left: 30px;
        margin-top: 30px;
        color: #9EB3C2;
        text-align: left;
        font-family: 'Martian Mono';
    }
    #box {
        height: 700px;
        min-height: auto    ;
        
    }
    #my-profile{
        font-family: 'Press Start 2P';
        color: #fed665;
    }


</style>