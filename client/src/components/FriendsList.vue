<template>
    <div class="card-1" v-if="usersFriends">
        <!-- display the list of pepople you follow -->
        <div class="friend-item" v-for="(friend, index) in usersFriends" :key="index">
            <!-- name -->
            <p style="font-weight: bold;">{{ friend.name }}</p>
            <!-- current squad -->
            <p v-if="friend.currentSquad">Squad: {{ friend.currentSquad.name }}</p>
            <p v-else>No current squad</p>
            <!-- game -->
            <p v-if="friend.currentSquad">Playing: {{ friend.currentSquad.game }}</p>
        </div>
    </div>
</template>

<script>

const axios = require('axios');
import { ref, onMounted } from 'vue';

export default {

    props: ["id"],

    setup(props) {
        const usersFriends = ref(null);

        const fetchUserFriends = () => {

            axios.get(`http://localhost:3000/api/users/${props.id}/friendslist`)
                .then(response => {
                    usersFriends.value = response.data;
                    // go thru each friend and add a squad to them using HATEOAS
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].currentSquad) {
                            axios.get(`http://localhost:3000/api/v1/squads/${response.data[i].currentSquad}`)
                                .then(response2 => {
                                    usersFriends.value[i].currentSquad = response2.data;
                                    // add the game name in the squad   !!!HATEOAS
                                    axios.get(response2.data._links.game.href)
                                        .then(response3 => {
                                            usersFriends.value[i].currentSquad.game = response3.data.name;
                                        })
                                        .catch(error => {
                                            console.error('Error fetching game data: ' + error);
                                        });
                                })
                                .catch(error => {
                                    console.error('Error fetching clan data: ' + error);
                                });
                        }
                    }

                })
                .catch(error => {
                    console.error('Error fetching clan data: ' + error);
                });
        };

        onMounted(() => {
            fetchUserFriends();
        });

        return {
            usersFriends,
        }

    }
}

</script>

<style scoped>
p {
    font-family: 'Martian Mono';
    size: 20px;
}

.card-1 {
    margin: 4%;
    padding: 3%;
    background-color: #fed665 !important;
    border-radius: 15px;
}

.friend-item {
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
}
</style>