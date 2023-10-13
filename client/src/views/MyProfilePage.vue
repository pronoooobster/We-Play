<template>
    <div id="background">
        <TopBar />
        <div v-if="user" class="container-md" id="box">
            <div id="component" class="container-fluid py-3">
                <h1 class="text-center" id="title">MY PROFILE</h1>
                <div class="bg-dark rounded-4" id="box">
                    <img v-if="user.photoURL" :src="user.photoURL" alt="Profile Picture" class="big-picture">
                    <div class="data">
                        <div class="row">
                            <div class="col-sm-4">
                                <p>Display Name:</p>
                            </div>
                            <div class="col-sm-4">
                                <p> {{ user.displayName }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-4">
                                <p>Email:</p>
                            </div>
                            <div class="col-sm-4">
                                <p> {{ user.email }}</p>
                            </div>
                        </div>

                    </div>
                    <div class="clans">
                        <h2 id="title">Clans</h2>
                        <ClanList :id="user.uid" />
                    </div>
                    <div class="friends">
                        <h2 id="title"> Friends</h2>
                        <FriendsList :id="user.uid" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClanList from "@/components/ClanList.vue";
import FriendsList from "@/components/FriendsList.vue";
import TopBar from "@/components/TopBar.vue";
import { getAuth } from "firebase/auth";

export default {

    components: {
    TopBar,
    ClanList,
    FriendsList
},
    data() {
        return {
            user: null,
        };
    },
    setup() {

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

<style scoped>
.big-picture {
    width: 20%;
    aspect-ratio: 1 / 1;
    margin-top: 3px;

}

.data {
    font-family: 'Martian Mono';
    margin-top: 5%;
    padding: 5%;
    color: #9EB3C2;
    text-align: left;
    font-family: 'Martian Mono';
    overflow: auto;
}

.clans {
    text-align: center;
}

h2 {
    font-size: 140%;
}

#box {
    padding: 5%;
    min-height: auto;

}

#background {
    background-color: #474747;
    position: relative;
    min-height: 100vh;
}

#title {
    font-family: 'Press Start 2P';
    color: #F7D063;
}
</style>