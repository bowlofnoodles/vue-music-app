<template>
<div>
  <scroll class="container" :data="songList">
    <div>
      <loading v-show="showLoading"></loading>
      <song-list :list="songList" v-show="!showLoading"></song-list>
      <p v-show="showNoRes" class="no-result">无搜索结果</p>
    </div>
  </scroll>
</div>
</template>

<script>
import { searchType } from 'common/js/config'
import { getSearchByKey } from 'api/search'
import SongList from 'base/song-list/SongList'
import { getSongsDetail } from 'api/song'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
export default {
  name: 'SearchSongs',
  components: {
    SongList,
    Scroll,
    Loading
  },
  data () {
    return {
      limit: 20,
      offset: 0,
      type: searchType.song,
      songList: [],
      showLoading: true,
      showNoRes: false
    }
  },
  computed: {
    keywords () {
      return this.$route.query.keywords
    }
  },
  methods: {
    getSearchByKey () {
      getSearchByKey({
        limit: this.limit,
        offset: this.offset,
        type: this.type,
        keywords: this.keywords
      }).then(res => {
        if (res && res.result && res.result.songs) {
          let tempData = res.result.songs
          let idArr = []
          tempData.forEach(item => {
            idArr.push(item.id)
          })
          this.getSongsDetail(idArr)
        } else {
          this.showLoading = false
          this.showNoRes = true
        }
      })
    },
    getSongsDetail (id) {
      getSongsDetail(id).then(res => {
        this.showLoading = false
        if (res) {
          this.songList = res
        } else {
          this.showNoRes = true
        }
      })
    }
  },
  mounted () {
    if (this.keywords) {
      this.getSearchByKey()
    }
  },
  watch: {
    keywords (newKey) {
      if (newKey) {
        this.showLoading = true
        this.showNoRes = false
        this.songList = []
        this.getSearchByKey()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .container
    position: absolute
    left: 0
    right: 0
    top: 2.5rem
    bottom: 0
    overflow: hidden
    .no-result
      height: 1.4rem
      line-height: 1.4rem
      text-align: center
      letter-spacing: 2px
 </style>
