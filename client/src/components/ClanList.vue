<template>
  <div v-if="usersClans">
    <h2 id="title" v-if="usersClans.length > 0">Clans:</h2>
    <div class="card-1" mx-auto v-if="usersClans.length > 0">
      <div id="animated" class="clans" v-for="(clan, index) in usersClans" :key="index" @click="redirect(clan.name)">
        <p style="font-weight: bold; font-size: 120%; margin: 3%;">{{ clan.name }}</p>
        <hr>
      </div>
    </div>
    <div v-else>
      <p id="title"> No Clans</p>
    </div>
  </div>
</template>


<script>

const axios = require('axios');
import { ref, onMounted } from 'vue';

export default {

  props: ["id"],

  methods: {
    redirect(name) {
      this.$router.replace(`/clans/${name}`).then(() => this.$router.go());
    }
  },

  setup(props) {
    const usersClans = ref(null);

    const fetchUserClans = () => {

      axios.get(`http://localhost:3000/api/users/${props.id}/clans`)
        .then(response => {

          if (response.data) {
            usersClans.value = response.data;
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
      fetchUserClans();
    });

    return {
      usersClans,
    }

  }
}

</script>


<style scoped>
.card-1 {
  margin: 4%;
  padding: 4%;
  background-color: #fed665 !important;
  border-radius: 15px;
}

#animated {
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

.clans {
  line-height: 4px;
  text-align: left;
  font-family: 'Martian Mono';
}

#title {
  font-family: "Press Start 2P";
  color: #f7d063;
  margin-bottom: 5%;
}

h2 {
  font-size: 140%;
}
</style>