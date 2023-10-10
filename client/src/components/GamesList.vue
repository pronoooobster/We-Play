<template>
  <div>
    <h1 style="font-family: 'Press Start 2P'; margin-top: 1%; margin-bottom: 1%; font-size: 50px;">Games</h1>
    <ul v-for= "game in gamesFromRAWG" :key="game.id" class="games">
        <div class="card" style="width: 900px;">
            <img :src="game.background_image" class="card-img-top" alt="...">
            <h5 class="card-title">{{ game.name }}</h5>
            <button data-bs-toggle="collapse"  :data-bs-target="'#descriptionToggle' + game.id">Game Description</button>
            <div :id="'descriptionToggle' + game.id" class="collapse">
                <div class="card-body">
                    <p class="card-text" v-if="game.description">{{ game.description }}</p>
                    <p class="card-text" v-else>No description available</p>
                </div>
        </div>
            <div class="card-body">
                <p v-if="game.teamSize === undefined">Team size: Unlimited!</p>
                <p v-else>Team size: {{ game.teamSize }}</p>
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
            gamesFromRAWG: [],
            gamesFromMongo: [], //store specified games
        };
    },
    mounted() {
        this.fetchGamesFromAPIs();
    },
    methods: {
        async fetchGamesFromAPIs() {
            try {
                const response = await axios.get('http://localhost:3000/api/games'); //Get the list of games from the mongo database
                const responseData = response.data;
                this.gamesFromMongo = responseData.map(game => ({
                    name: game.name,
                    teamSize: game.teamSize,
                }));
                console.log(this.gamesFromMongo);
                //loop through the array to find the games in the RAWG api by using a search querry with the name of the game
                for (const gameName of this.gamesFromMongo) {
                    const nameForFinding = gameName.name;
                    const response = await axios.get(`https://api.rawg.io/api/games?key=4179ef8b1acb4bae99d6f2675731f8a3&search=${nameForFinding}`); //get the game from the API
                    const data = response.data.results[0]; //get the first result
                    //add the team size field
                    data.teamSize = gameName.teamSize;

                    //get the description of the game
                    const responseForDescription = await axios.get(`https://api.rawg.io/api/games/${data.id}?key=4179ef8b1acb4bae99d6f2675731f8a3`);
                    const descriptionData = responseForDescription.data;
                    data.description = descriptionData.description_raw;
                    

                    console.log(data);
                    if (data) {
                        this.gamesFromRAWG.push(data); //add the game to the array
                    }
                    else {
                        console.log("Game not found");
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        },
    },
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