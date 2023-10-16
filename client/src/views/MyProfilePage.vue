<template>
    <div id="background">
        <TopBar />
        <div v-if="user && DBuser" class="container-md" id="box">
            <div id="component" class="container-fluid py-3">
                <div class="bg-dark rounded-4" id="box">
                    <div v-if="DBuser._id == user.uid">
                        <h1 class="text-center" id="title">MY PROFILE</h1>
                        <img v-if="user.photoURL" :src="user.photoURL" alt="Profile Picture" class="big-picture" />
                        <div class="data">
                            <div class="row">
                                <div class="col-sm-4">
                                    <p>Display Name:</p>
                                </div>
                                <div class="col-sm-4">
                                    <p>{{ DBuser.name }}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <p>Email:</p>
                                </div>
                                <div class="col-sm-4">
                                    <p>{{ user.email }}</p>
                                </div>
                                <button type="button" id="change-name-button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#nameModal">
                                    Change name
                                </button>
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
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" >
                                                    Cancel
                                                </button>
                                                <button id="accept-button" type="button" class="btn btn-primary" @click="editName(newName)"
                                                    aria-label="Close">
                                                    Accept
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h1 class="text-center" id="title">{{ DBuser.name }}`s PROFILE</h1>
                    </div>
                    <div class="clans">
                        <h2 id="title">Clans</h2>
                        <ClanList :id="DBuser._id" />
                    </div>
                    <div class="friends">
                        <h2 id="title">Friends</h2>
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
            Dbuser: null,
        };
    },

    methods: {
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
            //getting the user information
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
}

.data {
    font-family: "Martian Mono";
    margin-top: 5%;
    padding: 5%;
    color: #9eb3c2;
    text-align: left;
    font-family: "Martian Mono";
    overflow: auto;
}

.clans {
    text-align: center;
}

h2 {
    font-size: 140%;
}

#change-name-button {
    color: #474747;
    background-color: #f7d063;
    border-color: #f7d063;
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
    font-family: "Press Start 2P";
    color: #f7d063;
}
</style>
