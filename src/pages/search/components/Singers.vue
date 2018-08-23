<template>
<div class="">
  搜索歌手
</div>
</template>

<script>
export default {
  name: 'SearchSingers',
  mounted () {
    console.log(this.$store.state.searchKey)
  }
}
</script>

<style lang="stylus" scoped>
</style>
