<template>
  <div id="app">
    <router-view/>
    <player></player>
  </div>
</template>

<script>
import Player from 'pages/player/Player'
export default {
  name: 'App',
  components: {
    Player
  }
}
</script>

<style lang="stylus" scoped>
</style>
