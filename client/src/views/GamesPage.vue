<template>
    <div id="background">
        <TopBar />
        <div class="container-md" id="box">
            <div id="component" class="container-fluid py-3">
                <div class="row" style= "margin-top: 2%; margin-bottom: 3%;">
                    <div class="col-lg-4">
                    </div>
                    <div class = "col-lg-4">
                        <h1 style="font-family: 'Press Start 2P'; color:#F7D063;">GAMES</h1>
                    </div>
                    <div v-if="user.isAdmin == true" class="col-lg-4" style="font-family: 'Martian Mono';">
                        <div><h style="color:#9EB3C2">ADMIN TOOLS</h></div>
                        <div class= "btn-group"  style="margin-bottom: 7%;">
                            <button type="button" class="btn btn-primary">ADD A NEW GAME</button>      
                            <button type="button" class="btn btn-danger" @click="deleteAllGames">DELETE ALL GAMES</button>
                        </div>
                </div>
                <GamesList />
            </div>
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
                isAdmin: false,
            }
        }

    },

    methods: {
        isAdmin(){
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
        
        deleteAllGames(){
            axios.delete('http://localhost:3000/api/games')
                .then(res => {
                    console.log(res);
                })
        }
        
    },
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

