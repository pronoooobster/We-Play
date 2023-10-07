<template>
  <div>
    <h1>Game Elements</h1>
    <p> {{ gamesFromApi }}</p>
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
                this.gamesFromFile = ["The Witcher 3: Wild Hunt", "The Elder Scrolls V: Skyrim", "Grand Theft Auto V", "The Legend of Zelda: Breath of the Wild", "Red Dead Redemption 2", "Mass Effect 2", "The Last of Us", "God of War", "The Witcher 3: Wild Hunt", "The Elder Scrolls V: Skyrim", "Grand Theft Auto V", "The Legend of Zelda: Breath of the Wild", "Red Dead Redemption 2", "Mass Effect 2", "The Last of Us", "God of War"];
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