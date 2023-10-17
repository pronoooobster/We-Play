<template>
  <div id="background">
    <TopBar />
    <div class="container-md">
      <div id="box" class="container-fluid py-3">
        <div class="card-1" v-if="clan && clan.name" style="margin-top: ;">
          <div class="card-header">{{ clan.name }}</div>
          <div class="card-body">
            <div class="card-2">
              <div v-if="clan.users.length > 0">
                <div class="card-header" style="font-size: 30px; color: #1F1F1F; width:100%;">Users</div>
                <div class="card-body">
                  <div class="users" v-for="(user, index) in clan.users" :key="index">
                    <div class="row">
                      <div class="col-2">
                        <div class="d-none d-sm-block profile-img" @click="redirect(user._id)">
                          <img v-if="user.photoURL" :src="user.photoURL" alt="Profile Picture" class="profile-img">
                          <img v-else src="../assets/default-profile.png" alt="Profile Picture" class="profile-img">
                        </div>
                      </div>
                      <div class="col-8" style="margin-top: 30px;">
                        <h4 @click="redirect(user._id)">{{ user.name }}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="users">
                The clan is empty
              </div>
            </div>
            <!-- games section -->
            <div class="card-2">
              <div v-if="clan.gamesList.length > 0">
                <div class="row">
                  <div class="column-lg-4">
                  </div>
                  <div class="column-lg-4"></div>
                  <div class="card-header" style="font-size: 30px; color: #1F1F1F;">Games</div>
                  <div class="column-lg-4">
         
                  </div>
                </div>
                <div class="card-body">
                  <div v-for="(game, index) in clan.gamesList" :key="index">
                    <div class="card-games">
                      <div class="card-header" style="font-size: 20px; margin-top: 20px; color: #9EB3C2;"> {{ game.name }}
                      </div>
                      <div class="card-body">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="users">
                The clan has no games
              </div>
            </div>
            <div class="card-footer">
              <button button type="button" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#gameAdd">Add game</button>
            </div>
          </div>
        </div>
        <div v-else>
          <p style="font-family: 'Press Start 2p'; color: #F7D063;">Loading...</p>
        </div>
      </div>
    </div>
  </div>
  <!-- form for creating games -->
  <div class="modal" id="gameAdd">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add a new game</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label for="gameName" class="form-label">Game name</label>
          <input name="game" class="form-control" list="gameDatalist" id="gameSelection" placeholder="Type to search..."
            required>
          <datalist id="gameDatalist" aria-label="GameSelection">
            <option v-for="game in games" :key="game.name">{{ game.name }}</option>
          </datalist>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addGame">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const axios = require('axios');
import { ref, onMounted } from 'vue';

import TopBar from "@/components/TopBar.vue";

export default {

  components: {
    TopBar
  },

  data() {
    return {
      games: null,
    }
  },

  props: ["id"],

  setup(props) {
    const clan = ref(null);

    const fetchClanData = () => {

      axios.get(`http://localhost:3000/api/clans/${props.id}`)
        .then(response => {

          if (response.data && response.data.name) {
            clan.value = response.data;
          }
          else {
            console.error('Invalid or missing data in the response.');
          }
        })
        .catch(error => {
          console.error('Error fetching clan data: ' + error);
        });
    };


    onMounted(() => {
      fetchClanData();
    });

    return {
      clan,
    }

  },
  mounted() {
    this.getGames();
  },
  methods: {
    redirect(_uid) {
      this.$router.push(`/profile/${_uid}`);
    },
    getGames() {
      axios.get('http://localhost:3000/api/games')
        .then(res => {
          this.games = res.data;
        })
    },
    addGame() {
      //get the input gameSelection as a JSON object
      const gameSelection = document.getElementById('gameSelection');
      // get the selected game name
      const gameId = gameSelection.value;

      // get the game id from the games
      const game = this.games.find(game => game.name === gameId);

      // check if the game is already in the clan
      if (this.clan.gamesList.some(game => game._id === game._id)) {
        alert('This game is already in the clan!')
        return
      }
      else {
        // post the game into the clan
        axios.post(`http://localhost:3000/api/clans/${this.clan.name}/games`, {
          "_id": game._id
        })
          .then(res => {
            console.log(res);
            // reload the page
            location.reload();
          })
          .catch(err => {
            console.log(err);
          })

      }
    }
  }
}

</script>

<style scoped>
.container-md {
  margin-top: 3%;
  background-color: #1F1F1F;
  border-radius: 21px;

}

#box {
  background-color: #1F1F1F;
}

.card-games {
  background-color: #1F1F1F;
  margin-left: 20%;
  margin-right: 20%;
}

.card-header {
  font-family: 'Press Start 2p';
  color: #FED665;
  font-size: 90px;

  /*make font smaller on phones */
  @media (max-width: 600px) {
    font-size: 40px;
  }
}

.users {
  font-size: 30px;

  /* make font smaller and align text to the middle on phones  */
  @media (max-width: 600px) {
    font-size: 3px;
    text-align: center;
    align-items: center;

  }

  /* hover controls */
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.6s;
  -webkit-transition-property: transform;
  transition-property: transform;
}

.users:hover {
  cursor: pointer;
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}

h4 {
  margin-top: 3%;

}

.profile-img {
  border-radius: 30%;

}

.card-1 {
  margin: 4%;
}

.card-2 {
  margin: 2%;
  padding: 2%;
  background-color: #F7D063;
  border-radius: 20px;
}

.users {
  text-align: left;
  font-family: 'Martian Mono';
}

#background {
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
</style>