<template>
  <div>
    <h1 style="font-family: 'Press Start 2P'; margin-top: 10px;">Games</h1>
    <ul v-for= "game in gamesFromApi" :key="game.id" class="games">
        <div class="card" style="width: 400px;">
            <img :src="game.background_image" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{ game.name }}</h5>
                <v-if game.description><p class="card-text">{{ game.description }}</p></v-if>
                <v-else><p class="card-text">No description available</p></v-else>
                <!-- TODO: Find a way of finding the description, styling page :D -->
            </div>
        </div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'GamesList',
    data() {
        return {
            gamesFromApi: [], //store games from API    
            gamesFromFile: [], //store specified games in the external file
        }
    },

    mounted() { //request game list from RAWG API
        this.fetchGamesFromFile();
        this.fetchGamesFromDatabase();
    },

    methods: {
        async fetchGamesFromFile(){ //get the games from the JSON file and put them on the array
            try {
                //TODO: change to the real file and figure out how to take it from the JSON
                // const response = await fetch(require("@/assets/games.json")); 
                // this.gamesFromFile = await response.json();
                this.gamesFromFile = ["Tetris", "Valorant", "CS:GO", "Minecraft"];
                console.log(this.gamesFromFile);

            } catch (error) {
                console.log(error);
            }
        },
        async fetchGamesFromDatabase(){
            try {
                //loop through the array of games using as refference the names stated on the JSON file
                for (const gameName of this.gamesFromFile){
                    const response = await axios.get(`https://api.rawg.io/api/games?key=4179ef8b1acb4bae99d6f2675731f8a3&search=${gameName}`); //get the game from the API
                    //maybe add a find by ID to get the description, but his would send too many requests
                    const data = response.data.results[0]; //get the first result
                if (data){
                    this.gamesFromApi.push(data); //add the game to the array
                } else {console.log("Game not found")}
            }            
            } catch (error) {
                console.log(error);
            }

        }
    }
}
</script>

<style scoped>
.games {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style: none;
    padding: 0;
}


</style>