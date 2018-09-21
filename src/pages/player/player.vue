<template>
  <div class="player" v-show="playlist.length > 0" ref="player">
    <!-- v-show="playlist.length > 0" -->
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img width="100%" height="100%" :src="currentSong.picUrl">
      </div>
      <div class="header">
        <div class="iconfont back-icon" @click="back">&#xe623;</div>
        <div class="desc">
          <div class="name">{{currentSong.name}}</div>
          <div class="singer">{{currentSong.singers}}<span class="iconfont">&#xe617;</span></div>
        </div>
      </div>
      <div class="middle" @click="toggleShow">
        <div class="middle-l" ref="middleL" v-show="!showLyric">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="cd" :class="cdCls">
              <img class="image" :src="currentSong.picUrl">
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">{{playingLyric}}</div>
          </div>
        </div>
        <scroll class="middle-r" ref="lyricList" v-show="showLyric" :data="currentLyric && currentLyric.lines">
          <div>
            <div class="lyric-wrapper" v-if="currentLyric && currentLyric.lines">
              <p
                class="text"
                ref="lyricLine"
                :class="{current: currentLineNum === index}"
                v-for="(item, index) of currentLyric.lines"
                :key="index"
              >{{item.txt}}</p>
            </div>
          </div>
        </scroll>
      </div>
      <div class="bottom">
        <div class="icon-wrapper" v-show="!showLyric">
          <!-- 收藏 -->
          <div class="iconfont">&#xe602;</div>
          <!-- 评论 -->
          <div class="iconfont comment" @click="turnToComment">
            &#xe63b;
            <span class="comment-count">{{currentSong.commentCount || 0}}</span>
          </div>
          <!-- 三点 -->
          <div class="iconfont three">&#xe6b9;</div>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent" @percentChange="onProgressPercentChange"></progress-bar>
          </div>
          <span class="time time-r">{{format(currentSong.duration/1000)}}</span>
        </div>
        <div class="play-icon-wrapper">
          <div class="iconfont mode" v-html="playMode" @click="changeMode"></div>
          <div class="iconfont prev" @click="prev">&#xe78a;</div>
          <div class="iconfont play" @click="togglePlaying" v-html="playIcon"></div>
          <div class="iconfont next" @click="next">&#xe7a5;</div>
          <div class="iconfont play-list">&#xe601;</div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="img-wrapper">
        <img :src="currentSong.picUrl" class="img-music">
      </div>
      <div class="music-desc">
        <p class="music-name">{{currentSong.name}}</p>
        <p class="lyric">{{playingLyric ? playingLyric : currentSong.singers}}</p>
      </div>
      <div class="iconfont music-play" @click.stop="togglePlaying" v-html="playIcon">
      </div>
      <div class="iconfont music-list">
        &#xe601;
      </div>
    </div>
    <audio
      :src="currentSong.url"
      ref="audio"
      style="display: none"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    >
      </audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ProgressBar from 'base/progress-bar/ProgressBar'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import scroll from 'base/scroll/Scroll'
import Lyric from 'common/js/lyric-parser'
export default {
  name: 'Player',
  components: {
    ProgressBar,
    scroll
  },
  data () {
    return {
      songReady: false,
      currentTime: 0,
      showLyric: false,
      currentLyric: null,
      currentLineNum: 0,
      playingLyric: ''
    }
  },
  computed: {
    cdCls () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? '&#xe60b;' : '&#xe9d8;'
    },
    playMode () {
      return this.mode === playMode.sequence ? '&#xe609;' : this.mode === playMode.loop ? '&#xe607;' : '&#xe67c;'
    },
    percent () {
      return this.currentTime / (this.currentSong.duration / 1000)
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  methods: {
    turnToComment () {
      this.$router.push({
        path: `/comment/music/${this.currentSong.id}`,
        query: {
          name: this.currentSong.name,
          singer: this.currentSong.singers,
          picUrl: this.currentSong.picUrl
        }
      })
    },
    ready () {
      this.songReady = true
    },
    error () {
      this.songReady = true
    },
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    togglePlaying () {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    toggleShow () {
      this.showLyric = !this.showLyric
      if (this.showLyric) {
        setTimeout(() => {
          this.$refs.lyricList.refresh()
        }, 20)
      }
    },
    prev () {
      if (!this.songReady) {
        return
      }
      if (this.playing.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      }
    },
    next () {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      }
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    resetCurrentIndex (list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    onProgressPercentChange (percent) {
      this.$refs.audio.currentTime = this.currentSong.duration / 1000 * percent
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentSong.duration * percent)
      }
    },
    format (time) {
      time = Math.floor(time)
      const minute = Math.floor(time / 60)
      const second = this._pad(time % 60)
      return `${minute}:${second}`
    },
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    getLyric () {
      this.currentSong.getLyric().then(res => {
        if (res) {
          this.currentLyric = new Lyric(res, this.handleLyric)
        }
        if (this.playing) {
          this.currentLyric.play()
        }
      }).catch(() => {
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLineNum = 0
      })
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlaylist: 'SET_PLAYLIST'
    })
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      const audio = this.$refs.audio
      this.$nextTick(() => {
        audio.play()
      })
      this.getLyric()
      newSong.getCommentCount()
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
    position: fixed
    width: 100%
    height: $header-height
    bottom: 0
    z-index: 100
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
        postition: fixed
        top: 0
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
          font-size: $font-size-medium
          flex: 1
          .name
            no-wrap()
          .singer
            padding-top: .2rem
            font-size: $font-size-small
            color: #ccc
            no-wrap()
      .middle
        position: fixed
        width: 100%
        top: 2rem
        bottom: 4rem
        font-size: 0
        .middle-l
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border-radius: 50%
              border: 8px solid rgba(255, 255, 255, .1)
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
          .playing-lyric-wrapper
            width: 100%
            font-size: $font-size-small
            padding-top: 1rem
            .playing-lyric
              width: 80%
              margin: 0 auto
              text-align: center
              color: $theme-color
              letter-spacing: 2px
        .middle-r
          width: 100%
          height: 86%
          box-sizing: border-box
          margin-top: 1.4rem
          overflow: hidden
          color: #ccc
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            .text
              padding: .34rem 0
              word-break: keep-all
              word-wrap: break-word
              overflow: hidden
              font-size: $font-size-small
              letter-spacing: 2px
              text-align: center
              &.current
                color: $theme-color
      .bottom >>> .iconfont
        font-size: .8rem
      .bottom
        position: fixed
        bottom: 0
        width: 100%
        // background: #000
        color: $theme-color
        font-size: $font-size-medium-x
        .icon-wrapper
          display: flex
          height: 1.4rem
          justify-content: center
          align-items: center
          .iconfont
            width: 2rem
            text-align: center
            &.comment
              position: relative
              .comment-count
                position: absolute
                right: 46px
                top: -22px
                font-size: $font-size-small-s
            &.three
              font-size: 1.1rem
              padding-bottom: .2rem
        .progress-wrapper
          display: flex
          width: 80%
          margin: 0 auto
          align-items: center
          justify-content: center
          padding: .2rem 0
          .time
            color: $theme-color
            font-size: $font-size-small-s
            width: .8rem
            &.time-l
              padding-right: .08rem
              text-align: left
            &.time-r
              padding-left: .08rem
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .play-icon-wrapper
          display: flex
          height: 2rem
          justify-content: space-around
          align-items: center
          padding-bottom: .6rem
          .play
            font-size: 1rem
          .play-list
            font-size: .88rem
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
        overflow: hidden
        margin-left: .2rem
        .music-name
          padding-bottom: .2rem
          font-size: $font-size-small-s
          no-wrap()
        .lyric
          color: $font-color-l
          font-size: $font-size-small-s
          no-wrap()
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
