<template>
    <div id="background">
        <TopBar />
        <div class="container-md" id="box">
            <div id="component" class="container-fluid py-3">
            <GamesList />
            </div>>
        </div>

  </div>
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

<style scoped>
#background{
    background-color: #474747;
}
.container-md{
    margin-top: 1%;
    background-color: #1F1F1F;
    border-radius: 21px;

}

</style>

