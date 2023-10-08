<template>
  <div>
    <TopBar />
  </div>

  <div>
    <div class="card-1" mx-auto v-if="usersClans">
      <h1 class="display-1"> {{ usersClans }}</h1>
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


<style>
.card-1 {
  margin: 4%;
  padding-bottom: 4%;
  background-color: #fed665 !important;
  border-radius: 30px;
}
</style>