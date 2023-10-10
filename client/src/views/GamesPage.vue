<template>
  <TopBar />
  <GamesList />
</template>

<script>
    import GamesList from '@/components/GamesList.vue';
import TopBar from '@/components/TopBar.vue';

    export default{
        components : {
    TopBar,
    GamesList
}
    }
</script>

