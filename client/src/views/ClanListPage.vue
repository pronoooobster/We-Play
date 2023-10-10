<template>
  <div>
    <div>
      <TopBar />
    </div>

    <div>
      <ClanList :id="id" />
    </div>
  </div>
</template>


<script>

import ClanList from '@/components/ClanList.vue';
import TopBar from '@/components/TopBar.vue';

export default {

  props: ["id"],

  components: {
    ClanList,
    TopBar
  },

}

</script>