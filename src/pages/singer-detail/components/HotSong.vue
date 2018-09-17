<template>
<div>
  <song-list :list="singer.hotSongs"></song-list>
</div>
</template>

<script>
import SongList from 'base/song-list/SongList'
export default {
  name: 'HotSong',
  props: {
    singer: {
      type: Object
    }
  },
  components: {
    SongList
  }
}
</script>

<style lang="stylus" scoped>
</style>
