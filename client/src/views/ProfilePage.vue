<template>
    <div id="background">
        <TopBar />
        <div v-if="user && DBuser" class="container-md" id="box">
            <div id="component" class="container-fluid py-3">
                <div class="bg-dark rounded-4" id="box">
                    <!--If the user is accessing its own userpage show more info-->
                    <div v-if="DBuser._id == user.uid">
                        <h1 class="text-center" id="title">MY PROFILE</h1>
                        <img v-if="DBuser.photoURL" :src="DBuser.photoURL" alt="Profile Picture" class="big-picture" />
                        <div class="data">
                            <div class="row">
                                <div class="col-sm-4">
                                    <p>Display Name:</p>
                                </div>
                                <div class="col-sm-4">
                                    <!--"DBuser" is the user info taken from our database-->
                                    <p>{{ DBuser.name }}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <p>Email:</p>
                                </div>
                                <div id="email" class="col-sm-4">
                                    <!--"user" is the user info taken from firebase-->
                                    <p>{{ user.email }}</p>
                                </div>
                                <button type="button" id="change-name-button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#nameModal">
                                    Change name
                                </button>
                                <!--edit name modal-->
                                <div class="modal fade" id="nameModal" tabindex="-1" aria-labelledby="nameModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="nameModalLabel">
                                                    Edit your name
                                                </h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <input name="newName" type="text" class="form-control" id="newName"
                                                    autocomplete="off" placeholder="Enter new name" required
                                                    v-model="newName" />
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                                    Cancel
                                                </button>
                                                <!--Accept name change button-->
                                                <button id="accept-button" type="button" class="btn btn-primary"
                                                    @click="editName(newName)" aria-label="Close">
                                                    Accept
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Show this if the user is accessing some else's-->
                    <div v-else>
                        <h1 class="text-center" id="title">{{ DBuser.name }}`s PROFILE</h1>
                        <img v-if="DBuser.photoURL" :src="DBuser.photoURL" alt="Profile Picture" class="big-picture" />
                    </div>
                    <!--Show this regardless of if the user is accessing its own profile page-->
                    <div class="clans">
                        <h2 id="title">Clans</h2>
                        <ClanList :id="DBuser._id" />
                    </div>
                    <div class="friends">
                        <h2 id="title">Followed</h2>
                        <FriendsList :id="DBuser._id" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
import ClanList from "@/components/ClanList.vue";
import FriendsList from "@/components/FriendsList.vue";
import TopBar from "@/components/TopBar.vue";
import { getAuth } from "firebase/auth";
import { onMounted, ref } from "vue";

export default {
    props: ["id"],

    components: {
        TopBar,
        ClanList,
        FriendsList,
    },
    data() {
        return {
            user: null,
        };
    },

    methods: {

        //patch request to edit name
        editName(newName) {
            axios
                .patch(`http://localhost:3000/api/users/` + this.user.uid, {
                    name: newName,
                })
                .then((response) => {
                    console.log(response.data);
                    location.reload();
                })

                .catch((error) => console.error(error));
        },
    },

    setup(props) {
        const DBuser = ref(null);

        //get request to get the info of the user specified in the URL
        const fetchUserClans = () => {
            axios
                .get(`http://localhost:3000/api/users/${props.id}`)
                .then((response) => {
                    if (response.data) {
                        DBuser.value = response.data;
                    } else {
                        console.error("Invalid or missing data in the response.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching clan data: " + error);
                });
        };

        onMounted(() => {
            fetchUserClans();
        });

        return {
            DBuser,
        };
    },

    created() {
        const auth = getAuth(); // Get the authentication instance

        auth.onAuthStateChanged((user) => {
            //getting the currently logged in user information
            this.user = user;
            console.log(user);
        });
    },

    name: "UserProfilePage",
};
</script>

<style scoped>
.big-picture {
    width: 20%;
    aspect-ratio: 1 / 1;
    margin-top: 3px;
    margin: 2%;
    border-radius: 30%;
}

.data {
    font-family: "Martian Mono";
    margin-top: 5%;
    padding: 5%;
    color: #9eb3c2;
    text-align: left;
    font-family: "Martian Mono";
}

.clans {
    text-align: center;
}
#change-name-button:hover, #change-name-button:focus, #change-name-button:active{
    cursor: pointer;
    background-color: #6D4B9E;
    color: white;
    border-color: #6D4B9E;

}
h2 {
    font-size: 140%;
}

#email {
    overflow: auto;
}

#change-name-button {
    color: #474747;
    background-color: #f7d063;
    border-color: #f7d063;
    display: inline-block;
    vertical-align: middle;
    /*hover animation*/
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    overflow: hidden;
    -webkit-transition-duration: 0.3s;
     transition-duration: 0.3s;
    -webkit-transition-property: color, background-color;
    transition-property: color, background-color;
}

#box {
    padding: 2%;
    min-height: auto;
}

#background {
    background-color: #474747;
    position: relative;
    min-height: 100vh;
}

#title {
    font-family: "Press Start 2P";
    color: #f7d063;
}
</style>
