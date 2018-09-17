<template>
<div>
  <base-header :title="singer.name" @back="back"></base-header>
  <div class="container">
    <div class="img-wrapper">
      <img :src="singer.picUrl" class="img"/>
      <div class="collect-btn">+ 收藏</div>
    </div>
    <div class="tab">
      <router-link tag="div" :to="{name: 'HotSong'}" class="tab-item" :class="{current: currentTab == 'HotSong'}">热门演唱</router-link>
      <router-link tag="div" :to="{name: 'Intro'}" class="tab-item" :class="{current: currentTab == 'Intro'}">艺人信息</router-link>
    </div>
    <scroll class="content" :listenScroll="true" :probe-type="3" @scroll="handleScroll" ref="content">
      <div>
        <router-view :singer="singer"></router-view>
      </div>
    </scroll>
  </div>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
import { createSinger } from 'common/js/singer'
import { getSinger } from 'api/singer'
import Scroll from 'base/scroll/Scroll'
import { playlistMixin } from 'common/js/mixin'
export default {
  name: 'SingerDetail',
  mixins: [playlistMixin],
  components: {
    BaseHeader,
    Scroll
  },
  data () {
    return {
      fromPath: '',
      singer: {},
      currentTab: '',
      scrollY: 0
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    back () {
      if (!this.fromPath) {
        this.$router.back()
      }
      this.$router.push(this.fromPath)
    },
    handlePlaylist () {

    },
    handleScroll (pos) {
      this.scrollY = pos.y
      this.scrollY = Math.max(-515, pos.y)
      // this.$refs.bgLayer.style['transform'] = `translate3d(0, ${this.scrollY}px, 0)`
    },
    getSinger () {
      getSinger(this.id).then(res => {
        if (res && res.artist) {
          let tempSinger = res.artist
          tempSinger.hotSongs = res.hotSongs
          this.singer = createSinger(tempSinger)
          this.singer.getIntro()
        }
      })
    }
  },
  mounted () {
    // 获取歌曲基本信息和热门演唱和个人介绍信息
    this.getSinger()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromPath = from.fullPath
      vm.currentTab = to.name
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.currentTab = to.name
    next()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .container
    position: absolute
    top: 1.3rem
    bottom: 0
    left: 0
    right: 0
    .img-wrapper
      position: relative
      height: 8rem
      background: #eee
      .img
        width: 100%
        height: 100%
      .collect-btn
        position: absolute
        bottom: .4rem
        width: 2rem
        left: 50%
        transform: translateX(-50%)
        padding: .2rem .4rem
        border-radius: .4rem
        background: $theme-bgcolor
        color: $theme-color
        text-align: center
        letter-spacing: 6px
    .tab
      display: flex
      border-bottom: 1px solid $border-color
      .tab-item
        width: 50%
        padding: .4rem 0
        text-align: center
        &.current
          border-bottom: 2px solid $theme-bgcolor
    .content
      position: absolute
      left: 0
      right: 0
      top: 9.36rem
      bottom: 0
      overflow: hidden
</style>
