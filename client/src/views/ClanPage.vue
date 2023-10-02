<template>
  <div>
    <div v-if="clan && clan.name">
      <p>Clan name: {{ clan.name }}</p>
      <p>Clan size: {{ clan.size }}</p>
      <div v-if="clan.users.length > 0">
        <p>Clan members: {{ clan.users }}</p>
      </div>
      <div v-else>
        The clan is empty
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

export default {

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