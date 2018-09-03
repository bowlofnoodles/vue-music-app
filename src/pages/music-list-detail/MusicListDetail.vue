<template>
<div>
  <base-header title="歌单" :router-back="true"></base-header>
  <div class="desc">
  </div>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
export default {
  name: 'MusicListDetail',
  components: {
    BaseHeader
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  mounted () {
    // console.log(this.$route.params.id)
  }
}
</script>

<style lang="stylus" scoped>
</style>
