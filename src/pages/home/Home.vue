<template>
<div class="home">
  <home-header></home-header>
  <div class="container">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</div>
</template>

<script>
import HomeHeader from './components/Header'
export default {
  name: 'Home',
  components: {
    HomeHeader
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .home
    .container
      margin-top: $header-height
</style>
