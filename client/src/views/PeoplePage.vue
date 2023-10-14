<template>
    <div id="background">
        <TopBar />
        <div class="container-md" id="box">
            <div id="component" class="container-fluid py-3">
                <div v-if="people.length > 0">
                    <div v-for="person in people" :key="person._id">
                        <div class="row">
                            <div class="col-2">
                                <img v-if="person.photoURL" :src="person.photoURL" alt="Profile Picture" class="profile-img" width="50" height="50">
                                <img v-else src="../assets/default-profile.png" alt="Profile Picture" class="profile-img" width="50" height="50">
                            </div>
                            <div class="col-8">
                                <h4>{{ person.name }}</h4>
                            </div>
                            <div class="col-2">
                                <button v-if="!person.isFriend" class="btn btn-primary" @click="follow(person)">Follow</button>
                                <button v-else class="btn btn-danger" @click="unfollow(person)">Unfollow</button>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import TopBar from '@/components/TopBar.vue';

    import { getAuth } from "firebase/auth"; // Import Firebase authentication
    import axios from 'axios';

    export default{
        components : {
            TopBar
        },

        data(){
            return{
                user: null,
                people: [],
            }
        },

        methods: {
            follow(person) {
                axios.post('http://localhost:3000/api/users/' + this.user._id + '/friendslist', {
                    _id: person._id
                })
                    .then(response => {
                        console.log(response);
                        person.isFriend = true;
                        location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            unfollow(person) {
                axios.delete('http://localhost:3000/api/users/' + this.user._id + '/friendslist/' + person._id)
                    .then(response => {
                        console.log(response);
                        person.isFriend = false;
                        location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        created() {
            const getPeople = () => {
                axios.get('http://localhost:3000/api/users')
                    .then(response => {
                        this.people = response.data;

                        // exclude the current user from the list
                        this.people = this.people.filter(person => {
                            return person._id !== this.user._id;
                        });

                        // for people who are already friends with the current user mark them as such
                        this.people.forEach(person => {
                            if (this.user.friendslist.includes(person._id)) {
                                person.isFriend = true;
                            } else {
                                person.isFriend = false;
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

            const auth = getAuth(); // Get the authentication instance

            // Listen for Firebase authentication state changes
            auth.onAuthStateChanged(user => {
                this.user = user;

                // get the full user fromm the database
                axios.get('http://localhost:3000/api/users/' + user.uid)
                    .then(response => {
                        this.user = response.data;

                        getPeople();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        }
    }
</script>

<style scoped>
#background{
    background-color: #474747;
}
.container-md{
    margin-top: 3%;
    background-color: #1F1F1F;
    border-radius: 21px;

}

</style>

