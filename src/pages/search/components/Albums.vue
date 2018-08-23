<template>
<div class="">
  搜索专辑
</div>
</template>

<script>
export default {
  name: 'SearchAlbums',
  mounted () {
    console.log(this.$store.state.searchKey)
  }
}
</script>

<style lang="stylus" scoped>
</style>
