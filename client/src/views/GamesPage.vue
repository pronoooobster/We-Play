<template>
    <div id="background">
        <TopBar style="z-index: 1 !important;" />
        <div class="container-md" id="box">
            <div id="component" class="container-fluid py-3">
                <div class="row" style="margin-top: 2%; margin-bottom: 3%;">
                    <div class="col-lg-4">
                    </div>
                    <div class="col-lg-4">
                        <h1 style="font-family: 'Press Start 2P'; color:#F7D063;">GAMES</h1>
                    </div>
                    <div v-if="user.isAdmin == true" class="col-lg-4" style="font-family: 'Martian Mono';">
                        <div>
                            <h style="color:#9EB3C2">ADMIN TOOLS</h>
                        </div>
                        <div class="btn-group" style="margin-bottom: 7%;">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createANewGame">ADD A NEW GAME</button>
                            <button type="button" class="btn btn-danger" @click="deleteAllGames">DELETE ALL GAMES</button>
                        </div>
                    </div>
                    <GamesList />
                </div>
            </div>
        </div>
    </div>

    <!-- form for creating games -->
        <div class="modal fade" id="createANewGame">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add a new game</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body">
                    <form id="gameCreation">
                        <div class="mb-3">  <!-- game name field -->
                            <label for="gameName" class="form-label">Game name</label>
                            <input name="gameName" type="text" class="form-control" id="gameName" required>
                        </div>                    
                        <div class="mb-3">   <!-- team size field -->
                            <label for="teamSize" class="form-label">Team size</label>
                            <input name="teamSize" type="number" class="form-control" id="teamSize" :disabled="isTextFieldDisabled" required>
                        </div>
                        <div class="mb-3 form-check">  <!-- unlimited team size checkbox -->
                        <label class="form-check-label">
                            <input name="unlimitedSize" class="form-check-label" type="checkbox" v-model="isTextFieldDisabled"> Unlimited team size
                        </label>
                        </div>
                    </form>
                </div> 
                <div class="modal-footer"></div>
                <p style="font-size: 12px; font-style: italic;" >To edit the team size of an already existing game insert the exact name of the target to edit</p>
                <button type="button" class="btn btn-primary" @click="createGame">Create</button>
                </div>
            </div>
        </div>
</template>

<script>
import GamesList from '@/components/GamesList.vue';
import TopBar from '@/components/TopBar.vue';
import axios from 'axios';
import { getAuth } from 'firebase/auth';



export default {
    components: {
        TopBar,
        GamesList
    },

    data(){
        return {
            user: {
                isAdmin: false
            },
            isTextFieldDisabled: false //for checkbox control
        }

    },

    created(){
            console.log("isAdmin");
            const auth = getAuth();
            auth.onAuthStateChanged(user => {
                this.user = user;
    
                axios.get('http://localhost:3000/api/users/' + this.user.uid)
                    .then(res => {
                        this.user = res.data;
                        console.log(this.user);
                        if(this.user.isAdmin == true){
                            this.user.isAdmin = true;
                        }
                        else{
                            this.user.isAdmin = false;
                        }
                    })
            })  
        },

    methods: {   
        createGame(){
            const form = document.getElementById('gameCreation');
            const formData = new FormData(form);
            let game = {};

            formData.forEach((value, key) => {
                game[key] = value;
            });
            console.log(game);

            if(game.gameName == "" || game.gameName == undefined){ //prevent name field being empty
                alert("Please insert a game name");
                return;
            }
             
            if(game.unlimitedSize == "on"){ //if the checkbox is checked, set the team size to undefined
                game.teamSize = undefined;
            }else{
                if(!game.teamSize || game.teamSize < 1){ //prevent team size being less than 1 or being empty
                    alert("Please insert a valid team size");
                    return;
                }else{game.teamSize = parseInt(game.teamSize);}
            }
                

            console.log(game.gameName);
     
            
            let request = {
                name: game.gameName,
                teamSize: game.teamSize,
            };

            //make the request name always be lowercase to avoid duplicates
            request.name = request.name.toLowerCase();
            console.log(request.name);

            axios.post('http://localhost:3000/api/games', request)
                .then(res => {
                    console.log(res);
                    location.reload();
                })
                .catch(err => {
                    console.log(err);
                    //if the game already exists, update the team size using put
                    if(err.response.status == 500){
                        axios.put('http://localhost:3000/api/games/' + request.name, request)
                            .then(res => {
                                console.log(res);
                                location.reload();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    else{
                        alert("Something went wrong");
                    }
                })
                

            console.log(request);
        },
        
        deleteAllGames(){
            let confirmationText = "Are you sure you want to delete all games? This action cannot be undone";

            if(confirm(confirmationText) == true){
                axios.delete('http://localhost:3000/api/games')
                    .then(res => {
                        console.log(res);
                        location.reload();
                    })
            }
        }
        
    }
}

</script>

<style scoped>

.container-md{
    margin-top: 3%;
    background-color: #1F1F1F;
    border-radius: 21px;

}



</style>

