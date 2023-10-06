<template>
  <div>
    <h1>Game Elements</h1>
    <p> {{ games }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'GamesList',
    data() {
        return {
            games: [],
        }
    },

    mounted() { //request game list from RAWG API
        // const apiKey = "4179ef8b1acb4bae99d6f2675731f8a3"
        const options = {
            method: 'GET',
            url: 'https://api.rawg.io/api/games?key=4179ef8b1acb4bae99d6f2675731f8a3',
            
        };

        axios
            .request(options)
            .then(response => {
                this.games = this.games.concat(response.data.results);
            
            })
            .catch(error => {
                console.error('Error fetching game data:', error);
            });
    },
}




</script>