<template>
<div>
  <base-header title="歌手" @back="back"></base-header>
  <scroll
    class="container"
    :data="hotSingerList"
    :pullup="true"
    @scrollToEnd="getHotSinger"
    ref="scroll">
    <div>
      <router-link tag="div" to="/singercate" class="iconfont singer border-bottom">
        &#xe600;<span>歌手分类</span>
      </router-link>
      <loading v-show="showLoading"></loading>
      <div v-show="!showLoading">
        <div class="title">热门歌手</div>
        <singer-list :list="hotSingerList" :showLoading="showPullUpLoading" @select="selectSinger"></singer-list>
      </div>
    </div>
  </scroll>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
import SingerList from './components/SingerList'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import { getHotSinger } from 'api/singer'
import { playlistMixin } from 'common/js/mixin'
export default {
  name: 'Singer',
  mixins: [playlistMixin],
  components: {
    BaseHeader,
    SingerList,
    Scroll,
    Loading
  },
  data () {
    return {
      hotSingerList: [],
      limit: 20,
      offset: 0,
      showLoading: true,
      showPullUpLoading: true,
      more: true
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '1.4rem' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    getHotSinger (flag) {
      if (!this.more) {
        return
      }
      if (flag) {
        this.offset = 0
        this.hotSingerList = []
      } else {
        this.offset += 20
      }
      getHotSinger(this.limit, this.offset).then(res => {
        if (res && res.artists) {
          if (!res.more) {
            this.showPullUpLoading = false
          }
          this.more = res.more
          this.hotSingerList = this.hotSingerList.concat(res.artists)
          this.showLoading = false
        }
      })
    },
    selectSinger (id) {
      this.$router.push(`/singer-detail/${id}`)
    }
  },
  mounted () {
    this.getHotSinger(true)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .container
    position: absolute
    top: $header-height
    bottom: 0
    left: 0
    right: 0
    .singer
      height: 1.24rem
      line-height: 1.24rem
      text-align: center
      font-size: $font-size-medium
      color: $font-color-l
      border-bottom: 1px solid $border-color
      span
        padding-left: .5em
    .title
      padding: .4rem 0 .4rem .2rem
      font-size: $font-size-medium
</style>
