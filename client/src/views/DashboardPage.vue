<template>
    <div class="page-content" style="background-color: #1F1F1F;">
        <TopBar />
        <!-- split screen in two if the website is on desktop -->
        <section class="d-none d-lg-block">

            <div class="container-fluid px-0">
                <div class="row g-0">
                    <div  class="col-lg-8 vh-100 left" id="squad-section">
                        <!-- base option (create or join squad) -->
                        <div v-if="!squad" class="center-section" id="base-section">
                            <p class="text-1">You are not currentry in a squad!</p>
                            <!-- create squad button -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#createSquadModal" style="background-color: #F7D063; border: 0px">
                                Create Squad
                            </button>
                            <br>
                            <!-- join squad button -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#joinSquadModal" style="background-color: #F7D063; border: 0px" >
                                Join Squad
                            </button>
                        </div>
                        <!-- in the squad - display members and leave button -->
                        <div v-else class="center-section" id="squad-section" style="">
                            <p class="text-1" style="font-weight: bold; font-size: 110px; color:#F7D063; text-decoration:underline;">{{ squad.name }}</p>
                            <p class="text-1">Playing: {{ squadGame.name }}</p>
                            <p class="text-1">Squad Size: {{ squad.maxPlayers }}</p>
                            <p class="text-1">Squad Members:</p>
                            <!-- list of members -->
                            <div v-for="member in squadMembers" :key="member._id">
                                <p class="text-2">{{ member.name }}</p>
                                <hr>
                            </div>
                            <!-- leave squad button -->
                            <button type="button" class="btn btn-danger" @click="leaveSquad">
                                Leave Squad
                            </button>
                        </div>
                        
                    </div>
                    <div class="col-lg-4 vh-100" id="friends-section">
                        <p class="text-1" style="margin-top: 10%;">Followed players:</p>
                        <!-- Friends list -->
                        <FriendsList v-if="user" class="center-section" :id="user.uid" />
                    </div>
                </div>
            </div>
            
        </section>

        <!-- section to be displayed only on the mobile -->
        <!-- side by side, swipaable -->
        <div class="carousel slide d-block d-lg-none mobile-carousel" data-bs-ride="carousel" data-bs-interval="600000" id="mobileCarousel">
            <!-- indicators DONT TOUCH -->
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#mobileCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#mobileCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>
            <!-- stuff inside -->
            <div class="carousel-inner">
                <div class="carousel-item active carousel-first">
                    <!-- fist page-->
                    <!-- base option (create or join squad) -->
                    <div v-if="!squad" class="center-section" id="base-section">
                        <p class="text-1">You are not currentry in a squad!</p>
                        <!-- create squad button -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#createSquadModal" style="background-color: #F7D063; border: 0px">
                            Create Squad
                        </button>
                        <br>
                        <!-- join squad button -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#joinSquadModal" style="background-color: #F7D063; border: 0px">
                            Join Squad
                        </button>
                    </div>
                    <!-- in the squad - display members and leave button -->
                    <div v-else class="center-section" id="squad-section">
                        <p class="text-1" style="font-weight: bold;">{{ squad.name }}</p>
                        <p class="text-1">Game: {{ squadGame.name }}</p>
                        <p class="text-1">Squad Size: {{ squad.maxPlayers }}</p>
                        <p class="text-1">Squad Members:</p>
                        <!-- list of members -->
                        <div v-for="member in squadMembers" :key="member._id">
                            <p class="text-2">{{ member.name }}</p>
                            <hr>
                        </div>
                        <!-- leave squad button -->
                        <button type="button" class="btn btn-danger" @click="leaveSquad">
                            Leave Squad
                        </button>
                    </div>
                </div>
                <div class="carousel-item carousel-second">
                    <!-- second page -->
                    <p class="text-1" style="margin-top: 10%;">Followed players:</p>
                        <!-- Friends list -->
                    <FriendsList v-if="user" class="center-section" :id="user.uid" />
                </div>
            </div>
            <!-- buttons DONT TOUCH -->
            <button class="carousel-control-prev" type="button" data-bs-target="#mobileCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#mobileCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>


        <!-- create sqad modal -->
        <div class="modal fade" id="createSquadModal" tabindex="-1" aria-labelledby="createSquadModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content" style="background-color: #1F1F1F;">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createSquadModalLabel">Create a squad</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="squadCreateForm" @submit.prevent>
                            <!-- squad name field -->
                            <div class="mb-3">
                                <label for="squadName" class="form-label text-2">Squad Name</label>
                                <input name="name" type="text" class="form-control" id="squadName" autocomplete="off" placeholder="Enter squad name" required>
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <!-- game selection dropdown -->
                            <div class="mb-3">
                                <label for="gameSelection" class="form-label text-2">Game</label>
                                <!-- datalist with the parsed games -->
                                <input name="game" class="form-control" list="gamesDatalist" id="gameSelection" placeholder="Type to search..." required>
                                <datalist aria-label="GameSelection" id="gamesDatalist" required>
                                    <!-- <option selected disabled value="">Select a game</option> -->
                                    <option v-for="game in games" :key="game.name">{{ game.name }}</option>
                                </datalist>
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <!-- squad size field -->
                            <div class="mb-3">
                                <label for="squadSize" class="form-label text-2">Squad Size</label>
                                <input name="maxPlayers" type="number" class="form-control" id="squadSize" placeholder="Enter squad size between 2 and 7" min="2" max="7" required>
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                                <div class="invalid-feedback">
                                    Please enter a squad size between 2 and 7!
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" form="squadCreateForm" @click="createSquad"
                        style="background-color: #F7D063; border: 0px;">Create</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- join squad modal -->
        <div class="modal fade" id="joinSquadModal" tabindex="-1" aria-labelledby="joinSquadModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content" style="background-color: #1F1F1F;">
                    <div class="modal-header">
                            <h5 class="modal-title" id="createSquadModalLabel">Join a squad</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <!-- list of all the available squads -->
                        <div v-for="availableSquad in availableSquads" :key="availableSquad._id">
                            <!-- squad name -->
                            <p class="text-2" style="font-weight: bold;">{{ availableSquad.name }}</p>
                            <!-- game name -->
                            <p class="text-2">Game: {{ availableSquad.game.name }}</p>
                            <!-- join button -->
                            <button type="button" class="btn btn-primary" @click="joinSquad(availableSquad._id)" 
                            style="background-color: #F7D063; border: 0px">
                                Join
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import TopBar from "@/components/TopBar.vue";
import FriendsList from "@/components/FriendsList.vue";

import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth"; // Import Firebase authentication
import router from "@/router";
import { onBeforeUnmount } from "vue";

import axios from 'axios'


export default {
    methods: {
        // create squad
        createSquad() {
            // get the form
            const form = document.getElementById('squadCreateForm');

            // get the form data
            const formData = new FormData(form);

            // check if the entered game is in the games list
            if (!this.games.some(game => game.name === formData.get('game'))) {
                alert('Please select a game from the list!')
                return
            }

            // convert formdata to json
            let squadData = {};
            formData.forEach((value, key) => {
                squadData[key] = value;
            });

            // get the game id from the games list
            let game = this.games.find(game => game.name === squadData.game)

            // add the game id to the json object
            squadData.game = game._id

            // post the form data to the server
            axios.post('http://localhost:3000/api/v1/squads', squadData)
                .then(res => {
                    console.log(res)
                    
                    // add the created squad to the user
                    axios.post('http://localhost:3000/api/users/' + this.user.uid + '/squad', {
                        "_id": res.data._id
                    })
                        .then(res2 => {
                            console.log(res2)
                            // add a user to the squad
                            axios.post('http://localhost:3000/api/v1/squads/' + res.data._id + '/users', {
                                "_id": this.user.uid
                            })
                                .then(res => {
                                    console.log(res)
                                    location.reload()

                                })
                                .catch(err => {
                                    console.log(err)
                                });
                        })
                        .catch(err => {
                            console.log(err)
                        });

                    // reload the page
                })
                .catch(err => {
                    console.log(err)
                });
        },

        // leave squad
        leaveSquad() {
            // delete the squad from the user
            axios.delete('http://localhost:3000/api/users/' + this.user.uid + '/squad')
                .then(res => {
                    console.log(res)
                    // if the squad has no more players, delete it
                    if (this.squad.currentPlayers.length <= 1) {
                        axios.delete('http://localhost:3000/api/v1/squads/' + this.squad._id)
                            .then(res => {
                                console.log(res)
                                // reload the page
                                location.reload()
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    } else {
                        // remove the user from the squad
                        axios.delete('http://localhost:3000/api/v1/squads/' + this.squad._id + '/users/' + this.user.uid)
                            .then(res => {
                                console.log(res)
                                // reload the page
                                location.reload()
                            })
                            .catch(err => {
                                console.log(err)
                            });
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        },

        // join squad
        joinSquad(squadId) {
            // add the squad to the user
            axios.post('http://localhost:3000/api/users/' + this.user.uid + '/squad', {
                "_id": squadId
            })
                .then(res => {
                    console.log(res)
                    // add a user to the squad
                    axios.post('http://localhost:3000/api/v1/squads/' + squadId + '/users', {
                        "_id": this.user.uid
                    })
                        .then(res => {
                            console.log(res)
                            // reload the page
                            location.reload()
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
                .catch(err => {
                    console.log(err)
                });
        }
    },
    components: {
        TopBar,
        FriendsList
    },
    data() {
        return {
            user: null,
            squad: null,
            games: null,
            squadGame: {
                name: "Loading..."
            },
            squadMembers: [
                {
                    name: "Loading..."
                }
            ],
            availableSquads: null
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
            // geth the users squad
            axios.get('http://localhost:3000/api/users/' + this.user.uid + '/squad')
                .then(res => {
                    this.squad = res.data
                    
                    // get the squad game
                    axios.get('http://localhost:3000/api/games/v2/' + this.squad.game)
                        .then(res => {
                            this.squadGame = res.data
                            console.log(this.squadGame)
                        })
                        .catch(err => {
                            console.log(err)
                        });

                    // get the squad members
                    axios.get('http://localhost:3000/api/v1/squads/' + this.squad._id + '/users')
                        .then(res => {
                            this.squadMembers = res.data
                            console.log(this.squadMembers)
                        })
                        .catch(err => {
                            console.log(err)
                        });

                    // get the squads that are not full
                    axios.get('http://localhost:3000/api/v1/squads/notfull')
                        .then(res => {
                            this.availableSquads = res.data
                            console.log(this.availableSquads)
                        })
                        .catch(err => {
                            console.log(err)
                        });
                })
                .catch(err => {
                    console.log(err)
                });

            // get the games list
            axios.get('http://localhost:3000/api/games')
                .then(res => {
                    this.games = res.data
                })
                .catch(err => {
                    console.log(err)
                });
        });
    },
};
</script>

<style scoped>
.page-content { /*prevent scroll bar*/
    height: 100vh;
    overflow: hidden;   
}
#squad-section{
    background-color: #1F1F1F;
}
#friends-section {
    background-color: #474747;

    /* centering everything inside */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.carousel-first {
    background-color: #1F1F1F;
}

.carousel-item {
    padding-top: 40%;
    height: 100vh;
    width: 100vw;
}

.carousel-second {
    background-color: #474747;
}

.form-label {
    font-size: 20px;
    font-family: 'Martian Mono';
}

li {
    font-size: 20px;
    font-family: 'Martian Mono';
}

.text-1 {
    font-size: 30px;
    font-family: 'Martian Mono';
    margin-bottom: 4%;
    color: #9EB3C2;
}

.text-2 {
    font-size: 20px;
    font-family: 'Martian Mono'; 
    color: #F7D063;
}

.modal-title {
    font-size: 20px;
    font-family: 'Martian Mono';
    color : #9EB3C2;
}

.btn-primary, .btn-danger {
    margin-bottom: 2%;
    font-size: 20px;
    width: 200px;
    font-family: 'Martian Mono';
}

.btn-secondary {
    margin-bottom: 2%;
    font-size: 20px;
    width: 200px;
    font-family: 'Martian Mono';
}

.left {
    background-color: #F5F5F5;

    /* centering everything inside */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}


.center-section {
    margin: auto;
}
</style>
