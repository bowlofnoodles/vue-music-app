<template>
  <div class="player" v-show="playlist.length > 0">
    <!-- v-show="playlist.length > 0" -->
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.picUrl">
      </div>
      <div class="header">
        <div class="iconfont back-icon" @click="back">&#xe623;</div>
        <div class="desc">
          <div class="name">{{currentSong.name}}</div>
          <div class="singer">{{currentSong.concatArtists}}<span class="iconfont">&#xe617;</span></div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-l" ref="middleL">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd play">
              <img class="image" :src="currentSong.picUrl">
            </div>
          </div>
        </div>
        <!-- <scroll class="middle-r" ref="lyricList">
          <div class="lyric-wrapper">
            <div>
              <p>一行一行歌词</p>
            </div>
          </div>
        </scroll> -->
      </div>
      <div class="bottom">
        <div class="icon-wrapper">
          <!-- 收藏 -->
          <!-- <div class="iconfont">&#xe602;</div> -->
          <!-- 评论 -->
          <!-- <div class="iconfont">&#xe63b;</div> -->
          <!-- 三点 -->
          <!-- <div class="iconfont">&#xe6b9;</div> -->
        </div>
        <div class="slider"></div>
        <div class="play-icon-wrapper"></div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="img-wrapper">
        <img :src="currentSong.picUrl" class="img-music">
      </div>
      <div class="music-desc">
        <p class="music-name">{{currentSong.name}}</p>
        <p class="lyric">{{currentSong.concatArtists}}</p>
      </div>
      <div class="iconfont music-play" @click.stop="togglePlaying" v-html="playIcon">
      </div>
      <div class="iconfont music-list">
        &#xe601;
      </div>
    </div>
    <audio :src="`http://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`" ref="audio" style="display: none"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Player',
  components: {
  },
  computed: {
    playIcon () {
      return this.playing ? '&#xe60b;' : '&#xe653;'
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing'
    ])
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    togglePlaying () {
      this.setPlayingState(!this.playing)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  },
  watch: {
    currentSong () {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        audio.play()
      })
    },
    playing (newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .player
    position: relative
    width: 100%
    height: $header-height
    .normal-player
      overflow: hidden
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 100
      background: $theme-bgcolor
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        text-align: center
        z-index: -1
        opacity: 0.6
        transform: scale(2)
        filter: blur(30px)
      .header
        display: flex
        height: 1.6rem
        align-items: center
        color: $theme-color
        border: 1px solid $trans-color
        .back-icon
          padding: 0 .36rem
          font-size: .68rem
        .desc
          position: relative
          flex: 1
          font-size: $font-size-medium
          .singer
            padding-top: .2rem
            font-size: $font-size-small
            color: #ccc
            text-shadow()
      .middle
        position: fixed
        width: 100%
        top: 2rem
        bottom: 4rem
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 70%
          .cd-wrapper
            position: absolute
            left: 15%
            top: 0
            width: 70%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border-radius: 50%
              border: 10px solid rgba(255, 255, 255, .1)
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
    .mini-player
      position: fixed
      left: 0
      bottom: 0
      display: flex
      align-items: center
      overflow: hidden
      width: 100%
      height: $header-height
      border-top: 1px solid $border-color
      background: $theme-color
      .img-wrapper
        width: 1rem
        height: 1rem
        margin: .2rem 0 .2rem .2rem
        background: $theme-color-d
        .img-music
          width: 100%
      .music-desc
        flex: 1
        margin-left: .2rem
        .music-name
          padding-bottom: .2rem
        .lyric
          color: $font-color-l
      .music-play
        width: .8rem
        padding-right: .6rem
        font-size: .8rem
        color: $font-color-l
      .music-list
        width: .8rem
        padding-right: .2rem
        text-align: right
        font-size: .8rem
        color: $font-color-l
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
