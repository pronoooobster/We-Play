<template>
  <div>
    <TopBar />
  </div>
  <div>
    <div class="card-1" mx-auto v-if="clan && clan.name">
      <h1 class="display-1"> {{ clan.name }}</h1>
      <p>Size: {{ clan.size }}</p>
      <div class="card-2" mx-auto>
        <div v-if="clan.users.length > 0">
          <h3> Members: </h3>
          <p class="users" v-for="(user, index) in clan.users" :key="index">
            {{ user.name }}
          </p>
        </div>
        <div v-else>
          The clan is empty
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
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

  }
}

</script>

<style scoped>
* {
  font-family: 'Martian Mono';
}

.card-1 {
  margin: 4%;
  padding-bottom: 4%;
  background-color: #fed665 !important;
  border-radius: 30px;
}

.card-2 {
  margin: 7%;
  padding: 3%;
  background-color: rgb(203, 174, 250);
  border-radius: 20px;
}

.users {
  text-align: left;
}
</style>