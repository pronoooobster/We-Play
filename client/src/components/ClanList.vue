<template>
  <div class="background">
    <div class="card-1" mx-auto v-if="usersClans">
      <p class="clans" v-for="(clan, index) in usersClans" :key="index">
        {{ clan.name }}
      </p>
    </div>
  </div>
</template>


<script>

const axios = require('axios');
import { ref, onMounted } from 'vue';

export default {

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


<style scoped>
.card-1 {
  margin: 4%;
  padding: 3%;
  background-color: #fed665 !important;
  border-radius: 15px;
}

.clans {
  line-height: 4px;
  text-align: left;
  font-family: 'Martian Mono';
}
</style>