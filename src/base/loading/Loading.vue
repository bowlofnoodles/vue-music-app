<template>
<div class="loading-wrapper">
  <img src="./images/loading.gif" class="loading"/>
</div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="stylus" scoped>
  .loading-wrapper
    margin-top: .4rem
    text-align: center
    z-index: 200
    .loading
      width: .6rem
</style>
