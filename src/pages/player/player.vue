<template>
  <div class="player">
    <div class="normal-player"></div>
    <div class="mini-player" v-show="showPlayBox">
      <div class="img-wrapper">
        <img :src="picUrl" class="img-music">
      </div>
      <div class="music-desc">
        <p class="music-name">{{name}}</p>
        <p class="lyric">{{artists}}</p>
      </div>
      <div class="iconfont music-play" v-html="playIcon" @click="pause">
      </div>
      <div class="iconfont music-list">
        &#xe601;
      </div>
    </div>
    <audio src="" ref="music" style="display: none"></audio>
  </div>
</template>

<script>
export default {
  name: 'Player'
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .normal-player
    position: fixed
    top: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 100
    background: $theme-color
  .mini-player
    position: fixed
    bottom: 0
    display: flex
    align-items: center
    overflow: hidden
    width: 100%
    height: 1.6rem
    border-top: 1px solid $border-color
    background: $theme-color
    z-index: 120
    .img-wrapper
      width: 1.2rem
      height: 1.2rem
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
      font-size: .84rem
      color: $font-color-l
    .music-list
      width: .8rem
      padding-right: .2rem
      text-align: right
      font-size: .8rem
      color: $font-color-l
</style>
