<template>
  <div id="background">
    <TopBar />
    <div class="container-md" id="box">
      <div v-if="clans">
        <div id="component" class="container-fluid py-3">
          <h1 style="font-family: 'Press Start 2P'; color:#F7D063; margin-top:5%;">CREATE A CLAN</h1>
          <!-- create clan button -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createClanModal">
            Create Clan
          </button>
          <h1 style="font-family: 'Press Start 2P'; color:#F7D063; margin-top:2%; margin-bottom: 5%;">DISCOVER CLANS</h1>
          <!--list of clans-->
          <div class="clans" v-for="clan in clans" :key="clan._id">
            <div class="row">
              <div id="animated" class="col-6">
                <h4 @click="redirect(clan.name)">{{ clan.name }}</h4>
              </div>
              <!--fix to avoid scrolling when its not necessary on a small screen-->
              <div class="col-6">
                <section class="d-none d-lg-block" id="buttons">
                  <!--Show join clan button if user is not in clan-->
                  <div v-if="!clan.joined">
                    <button class="btn btn-primary" @click="joinClan(clan)">Join</button>
                  </div>
                  <div v-else>
                    <button type="button" class="btn btn-danger" @click="deleteClan(clan)">Delete</button>
                    <button class="btn btn-danger" @click="leaveClan(clan)">Leave</button>
                  </div>
                </section>
              </div>
              <section class="d-lg-none" id="buttons">
                <div v-if="!clan.joined">
                  <button class="btn btn-primary" @click="joinClan(clan)">Join</button>
                </div>
                <div v-else>
                  <button type="button" class="btn btn-danger" @click="deleteClan(clan)">Delete</button>
                  <button class="btn btn-danger" @click="leaveClan(clan)">Leave</button>
                </div>
              </section>
              <hr>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    </div>
    <!--create clan modal-->
    <div class="modal fade" id="createClanModal" tabindex="-1" aria-labelledby="createClanModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createClanModalLabel">Create a Clan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="clanCreateForm" @submit.prevent>
              <!-- clan name field -->
              <div class="mb-3">
                <label for="squadClan" class="form-label">Clan Name</label>
                <input name="name" type="text" class="form-control" id="clanName" autocomplete="off"
                  placeholder="Enter clan name" required>
                <div class="valid-feedback">
                  Looks good!
                </div>
              </div>
              <!-- game selection dropdown -->
              <div class="mb-3">
                <label for="gameSelection" class="form-label">Game</label>
                <!-- datalist with the parsed games -->
                <input name="game" class="form-control" list="gamesDatalist" id="gameSelection"
                  placeholder="Type to search..." required>
                <datalist aria-label="GameSelection" id="gamesDatalist" required>
                  <!-- <option selected disabled value="">Select a game</option> -->
                  <option v-for="game in games" :key="game.name">{{ game.name }}</option>
                </datalist>
                <div class="valid-feedback">
                  Looks good!
                </div>
              </div>
              <!-- clan size field -->
              <div class="mb-3">
                <label for="clanSize" class="form-label">Clan Size</label>
                <input name="size" type="number" class="form-control" id="clanSize" placeholder="Enter clan size"
                  required>
                <div class="valid-feedback">
                  Looks good!
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary" form="clanCreateForm" @click="createClan">Create</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>

import TopBar from '@/components/TopBar.vue';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

export default {

  components: {
    TopBar
  },

  data() {
    return {
      //declare variable
      clans: null,
      games: null
    }
  },

  methods: {

    redirect(name) {
      this.$router.push(`/clans/${name}`);
    },

    // create squad
    createClan() {
      // get the form
      const form = document.getElementById('clanCreateForm');

      // get the form data
      const formData = new FormData(form);

      // check if the entered game is in the games list
      if (!this.games.some(game => game.name === formData.get('game'))) {
        alert('Please select a game from the list!')
        return
      }

      if (this.clans.some(clan => clan.name === formData.get('name'))) {
        alert('Name already in use!')
        return
      }

      // convert formdata to json
      let clanData = {};
      formData.forEach((value, key) => {
        clanData[key] = value;
      });

      // get the game id from the games list
      let game = this.games.find(game => game.name === clanData.game)

      // add the game id to the json object
      clanData.game = game._id

      console.log(clanData)

      // post the form data to the server
      axios.post('http://localhost:3000/api/clans/', clanData)
        .then(res => {
          console.log(res)

          // add the created clan to the user
          axios.post('http://localhost:3000/api/users/' + this.user._id + '/clans', {
            "_id": res.data._id
          })
            .then(res2 => {
              console.log(res2)
              // add a user to the clan
              axios.post('http://localhost:3000/api/clans/' + res.data.name + '/users', {
                "_id": this.user._id
              })
                .then(res => {
                  console.log(res)
                  location.reload()

                })
                .catch(err => {
                  console.log(err)
                });
            })
            .catch(err => {
              console.log(err)
            });

          // reload the page
        })
        .catch(err => {
          console.log(err)
        });
    },

    deleteClan(clan) {

      //Ask the user for confirmation before deleting a game
      if (confirm("Are you sure you want to delete the clan?")) {
        axios.delete(`http://localhost:3000/api/clans/` + clan.name).then(response => {
          console.log(response);
          location.reload();
        })
      }
    },

    joinClan(clan) {
      //post user to clan
      axios.post(`http://localhost:3000/api/users/` + this.user._id + '/clans', {
        "_id": clan._id
      }).then(response => {
        console.log(response);
        //post clan to user
        axios.post(`http://localhost:3000/api/clans/` + clan.name + `/users/`, {
          "_id": this.user._id
        }).then(response => {
          console.log(response);
          clan.joined = true;
          location.reload();
        })
          .catch(error => {
            console.log(error);
          });
      })
        .catch(error => {
          console.log(error);
        });
    },

    leaveClan(clan) {
      //delete clan from the user clan list
      axios.post(`http://localhost:3000/api/users/` + this.user._id + '/clans/' + clan.name + '?_method=DELETE')
        .then(response => {
          console.log(response);
          // delete user from the clan user list
          axios.post(`http://localhost:3000/api/clans/` + clan.name + '/users/' + this.user._id + '?_method=DELETE')
            .then(response2 => {
              console.log(response2);
              clan.joined = false;
              location.reload();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
  },

  created() {

    const fetchClans = () => {
      axios.get(`http://localhost:3000/api/clans/`)
        .then(response => {
          //It is not an href so we assign it using this
          this.clans = response.data;

          this.clans.forEach(clan => {
            if (this.user.clansList.includes(clan._id)) {
              clan.joined = true;
            } else {
              clan.joined = false;
            }
          });
        })
        .catch(error => {
          console.error('Error fetching clan data: ' + error);
        })
    }

    const auth = getAuth(); // Get the authentication instance

    auth.onAuthStateChanged((user) => {
      //getting the currently logged in user information
      this.user = user;
      console.log(user);

      // get the full user from the database
      axios.get('http://localhost:3000/api/users/' + user.uid)
        .then(response => {
          this.user = response.data;

          fetchClans();
        })
        .catch(error => {
          console.log(error);
        });

      axios.get('http://localhost:3000/api/games')
        .then(res => {
          this.games = res.data
        })
        .catch(err => {
          console.log(err)
        });
    });
  }
}

</script>

<style scoped>
#background {
  height: 100vh;
  overflow: auto;
}

#animated {
  font-size: 30px;
  /* hover controls */
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.6s;
  -webkit-transition-property: transform;
  transition-property: transform;
}

#animated:hover {
  cursor: pointer;
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}

.col-6 {
  align-self: center;
}

.btn {
  margin: 5%;
}

h4 {
  color: #9EB3C2;
  transition: all .2s ease-in-out;
}

#box {
  font-family: 'Martian Mono';
  min-height: auto;
}

.container-md {
  margin-top: 3%;
  background-color: #1F1F1F;
  border-radius: 21px;

}
</style>