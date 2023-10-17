<template>
  <div id="background">
    <TopBar />

    <div v-if="clans" class="container-md" id="box">
      <div class="clans" v-for="clan in clans" :key="clan._id">

        <div class="row">
          <div class="col-2">
            <h4>{{ clan.name }}</h4>
          </div>
          <div class="col-8">
            <h4>{{ clan.size }}</h4>
            <h1>{{ clan.joined }}</h1>
          </div>
          <div class="col-2">
            <button v-if="!clan.joined" class="btn btn-primary" @click="joinClan(clan)">Join</button>
            <button v-else class="btn btn-danger" @click="leaveClan(clan)">Leave</button>
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
    }
  },

  methods: {
    joinClan(clan) {
      axios.post(`http://localhost:3000/api/users/` + this.user._id + '/clans', {
        "_id": clan._id
      }).then(response => {
        console.log(response);
        clan.joined = true;
        location.reload();
      })
        .catch(error => {
          console.log(error);
        });
    },

    leaveClan(clan) {
      axios.post(`http://localhost:3000/api/users/` + this.user._id + '/clans/' + clan.name + '?_method=DELETE' )
      .then(response => {
        console.log(response);
        clan.joined = false;
        location.reload();
      })
        .catch(error => {
          console.log(error);
        });
    }
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

      // get the full user fromm the database
      axios.get('http://localhost:3000/api/users/' + user.uid)
        .then(response => {
          this.user = response.data;

          fetchClans();
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
}

</script>

<style>
#box {
  padding: 5%;
  min-height: auto;
}

.container-md {
  margin-top: 3%;
  background-color: #1F1F1F;
  border-radius: 21px;

}
</style>