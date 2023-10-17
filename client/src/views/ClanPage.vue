<template>
  <div id="background">
    <TopBar />
    <div id="component" class="container-fluid py-3">
      <div class="card-1" mx-auto v-if="clan && clan.name">
        <div class="card-header">{{ clan.name }}</div>
        <div class="card-body">
          <p>Size: {{ clan.size }}</p>
          <div class="card-2">
            <div v-if="clan.users.length > 0">
              <div class="card-header" style="font-size: 30px; color: #1F1F1F; margin-top: 2px">Users</div>
              <div class="card-body">
                <div class="users" v-for="(user, index) in clan.users" :key="index">
                  <div class="row">
                    <div class="col-2">
                      <div class="profile-img" @click="redirect(user._id)">
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
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
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
  methods: {
    redirect(_uid) {
      this.$router.push(`/profile/${_uid}`);
    },
  } 
}

</script>

<style scoped>
.card-header{
  font-family: 'Press Start 2p';
  color: #FED665;
  font-size: 80px;
  /*make font smaller on phones */
  @media (max-width: 600px) {
    font-size: 40px;
  }
}
.users{
  font-size: 30px;
      /* hover controls */
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.6s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.users:hover{
  cursor: pointer;
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}
h4{
    margin-top: 3%;

}
.profile-img{
    border-radius: 30%;

}

.card-1 {
  margin: 4%;
  padding-bottom: 4%;
  background-color: #1F1F1F;
  border-radius: 30px;
}

.card-2 {
  margin: 7%;
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