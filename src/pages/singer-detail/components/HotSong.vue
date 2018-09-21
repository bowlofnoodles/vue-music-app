<template>
<scroll>
  <song-list :list="singer.hotSongs"></song-list>
</scroll>
</template>

<script>
import SongList from 'base/song-list/SongList'
import Scroll from 'base/scroll/Scroll'
export default {
  name: 'HotSong',
  props: {
    singer: {
      type: Object
    }
  },
  components: {
    SongList,
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
</style>
