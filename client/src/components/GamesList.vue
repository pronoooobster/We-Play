<template>
    <div class="background">
        <ul v-for="game in gamesFromRAWG" :key="game.id" class="games">
            <div class="card" style="width: 900px;">
                <h5 class="card-header">{{ game.name }}</h5>
                <img :src="game.background_image" class="card-img" alt="...">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <p v-if="game.teamSize === undefined">Team size: Unlimited!</p>
                            <p v-else>Team size: {{ game.teamSize }}</p>
                        </div>
                        <div class="col">
                            <p>Metacritic Rating: {{ game.metacritic }}</p>
                        </div>
                    </div>
                </div>
                <div class="accordion" id="accordionGames">
                    <h2 class="accordion-header" id="gamesDescription">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        :data-bs-target="'#descriptionToggle' + game.id" aria-expanded="false" aria-controls="collapseDescription" id="toggleButton">
                            Description
                        </button>
                    </h2>
                    <div :id="'descriptionToggle' + game.id" class="accordion-collapse collapse" aria-labelledby="gamesDescription"
                        data-bs-parent="#accordionGames">
                        <div class="accordion-body">
                            <p class="card-text" v-if="game.description">{{ game.description }}</p>
                            <p class="card-text" v-else>No description available</p>
                        </div>
                    </div>
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
.card {
    background-color: #F7D063;
} 
.card-header{
    font-family: 'Martian Mono';
    font-weight:400;
    font-size: 40px;
    background-color: #F7D063;
}
.card-body{
    font-family: 'Martian Mono';
    font-size: 20px;
}
.accordion{
    background-color: #F7D063;
}
#toggleButton{
    font-family: 'Martian Mono';
    font-weight:bold;
    text-align: center;
    display: block;
    font-size: 30px;
    font-weight: 400;
    color: #F7D063;
    background-color: #60418B;
}



</style>