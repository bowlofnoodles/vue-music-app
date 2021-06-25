<template>
<div>
  <base-header :title="title" :router-back="true"></base-header>
  <scroll
    class="container"
    :listenScroll="true"
    @scroll="handleScroll"
    :probeType="3"
    v-show="!showCheck"
    ref="scroll"
  >
    <div>
      <div class="header-desc">
        <div class="bg-blur" :style="{background: `url(${this.musicListData.backgroundImage})`}"></div>
        <div class="desc-content">
          <div class="desc-wrapper">
            <div class="img-wrapper">
              <img :src="this.musicListData.picUrl"/>
              <div class="number"><span class="iconfont">&#xe885;</span>{{this.musicListData.playCount}}</div>
            </div>
            <div class="info">
              <p class="name">{{this.musicListData.name}}</p>
            </div>
          </div>
          <div class="icon-wrapper">
            <div class="icon-item">
              <div class="iconfont comment" @click="turnToComment">&#xe63b;</div>
              <span class="icon-info num">{{this.musicListData.commentCount === 0 ? '评论' :this.musicListData.commentCount}}</span>
            </div>
            <div class="icon-item">
              <div class="iconfont">&#xe602;</div>
              <span class="icon-info">收藏</span>
            </div>
            <div class="icon-item" @click="changeShowCheck">
              <div class="iconfont">&#xe6a9;</div>
              <span class="icon-info">多选</span>
            </div>
          </div>
        </div>
      </div>
      <loading v-show="showLoading"></loading>
      <div class="song-list" v-show="!showLoading">
        <div class="title" @click="random">
          <div class="iconfont play">&#xe611;</div>
          随机播放全部 (共{{this.musicListData.songsCount}}首)
        </div>
        <song-list :list="this.musicListData.songListData"></song-list>
      </div>
    </div>
  </scroll>
  <check v-show="showCheck" @changeShowCheck="changeShowCheck" ref="check" :list="this.musicListData.songListData ? this.musicListData.songListData : []"></check>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
import SongList from 'base/song-list/SongList'
import Scroll from 'base/scroll/Scroll'
import Check from './components/Check'
import { getMusicListDetail } from 'api/music-list'
import Loading from 'base/loading/Loading'
import { mapActions } from 'vuex'
import { createMusicList } from 'common/js/music-list'
import { playlistMixin } from 'common/js/mixin'
export default {
  name: 'MusicListDetail',
  mixins: [playlistMixin],
  components: {
    BaseHeader,
    SongList,
    Loading,
    Scroll,
    Check
  },
  data () {
    return {
      title: '歌单',
      musicListData: {},
      showLoading: true,
      showCheck: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    turnToComment () {
      this.$router.push({
        path: `/comment/playlist/${this.musicListData.id}`,
        query: {
          name: this.musicListData.name,
          picUrl: this.musicListData.picUrl
        }
      })
    },
    back () {
      this.$router.back()
    },
    changeShowCheck () {
      this.showCheck = !this.showCheck
      if (this.showCheck) {
        this.$refs.check.scrollRefresh()
      }
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '1.4rem' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    handleScroll (pos) {
      let htmlFontSize = document.documentElement.style.fontSize
      htmlFontSize = htmlFontSize.replace('px', '')
      if (Math.abs(pos.y) >= htmlFontSize * 4.8) {
        this.title = this.musicListData.name
      } else {
        this.title = '歌单'
      }
    },
    random () {
      this.randomPlay({
        list: this.musicListData.songListData
      })
    },
    getMusicListDetail (id) {
      getMusicListDetail(id).then((res) => {
        if (res && res.data && res.data.playlist) {
          this.getMusicListDetailSucc(res.data.playlist)
        }
      })
    },
    getMusicListDetailSucc (data) {
      this.musicListData = createMusicList(data)
      this.showLoading = false
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  },
  mounted () {
    this.getMusicListDetail(this.id)
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
    overflow: hidden
    .header-desc
      position: relative
      overflow: hidden
      height: 4.8rem
      .bg-blur
        background: $theme-bgcolor
        background-repeat: no-repeat
        background-position: 50%
        background-size: cover
        filter: blur(25px)
        transform: scale(1.2);
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        z-index: 1
        &:after
          content: ''
          background: rgba(0, 0, 0, .25)
          position: absolute
          left: 0
          right: 0
          top: 0
          bottom: 0
          z-index: 1
      .desc-content
        position: relative
        z-index: 2
        .desc-wrapper
          display: flex
          height: 3.4rem
          margin: 0 .24rem
          align-items: center
          .img-wrapper
            position: relative
            width: 2.8rem
            height: 0
            padding-bottom: 2.8rem
            &:after
              content: " "
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: .48rem
              z-index: 2
              background-image: linear-gradient(180deg,rgba(0,0,0,.2),transparent)
            img
              width: 100%
              border-radius: .1rem
            .number
              position: absolute
              top: .1rem
              right: .1rem
              z-index: 3
              font-size: .36rem
              color: $theme-color
              text-shadow()
              .iconfont
                padding-right: .04rem
          .info
            flex: 1
            padding-left: .4rem
            .name
              padding-bottom: .3rem
              line-height: 1.5
              font-size: $font-size-medium
              color: $theme-color
            .desc
              color: #aaa
              line-height: 1.2
              ellipsis(2)
        .icon-wrapper
          display: flex
          justify-content: space-around
          align-items: center
          height: 1rem
          color: $theme-color
          .icon-item
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            width: 2rem
            .iconfont
              font-size: $font-size-large
              height: .6rem
              line-height: .6rem
              margin-bottom: .16rem
              &.comment
                font-size: .66rem
            .icon-info
              &.num
                font-size: .38rem
                vertical-align: base
    .title
      display: flex
      height: 1.4rem
      line-height: 1.4rem
      border-bottom: 1px solid $border-color
      color: $font-color-l
      .play
        width: 1.12rem
        text-align: center
        font-size: $font-size-large
</style>
