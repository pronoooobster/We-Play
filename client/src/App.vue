<template>
  <router-view />
</template>

<script>
// import HomePage from './components/HomePage.vue'
// import DashboardPage from './components/DashboardPage.vue'

export default {
  name: 'App',
  // components: {
  //   HomePage,
  //   DashboardPage
  // }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Martian+Mono&family=Poppins:wght@700&family=Press+Start+2P&family=Roboto:wght@500&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;

}
#background {
    background-color: #474747;  
    position:relative;
    min-height: 100vh;
}
</style>
