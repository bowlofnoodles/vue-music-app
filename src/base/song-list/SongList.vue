<template>
<div>
  <ul class="list">
    <li class="item" v-for="(item, id) of list" :key="item.id" @click="playMusic(item.id)">
      <div class="range">{{id+1}}</div>
      <div class="info">
        <p class="name">{{item.name}}<span class="alias" v-if="item.song.alias.length">({{item.song.alias[0]}})</span></p>
        <div class="desc">{{item.concatArtists}} - {{item.song.album.name}}</div>
      </div>
      <div class="icon-wrap">
        <span class="iconfont mv-icon">&#xe667;</span>
        <span class="iconfont sel-icon">&#xe6b9;</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'MusicList',
  props: {
    list: Array,
    default: []
  },
  methods: {
    concatSingers (singers) {
      let result = ''
      singers.forEach((val, index) => {
        if (index === 0) {
          result += val.name
        } else {
          result += `/${val.name}`
        }
      })
      return result
    },
    playMusic (id) {
    }
  },
  watch: {
    list () {
      if (this.list) {
        this.list.forEach((val) => {
          val.concatArtists = this.concatSingers(val.song.artists)
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .hightlight
    color: $highlight-color
  .item
    display: flex
    align-items: center
    height: 1.8rem
    border-bottom: 1px solid $border-color
    .range
      width: .32rem
      padding: 0 .4rem
      font-size: $font-size-medium
      color: $font-color-l
    .info
      overflow: hidden
      flex: 1
      .name
        font-size: $font-size-medium
        padding-bottom: .2rem
        no-wrap()
        .alias
          padding-left: .08rem
          color: $font-color-l
      .desc
        color: $font-color-l
        no-wrap()
    .icon-wrap
      color: $font-color-tran-l
      .mv-icon
        font-size: .6rem
        padding-right: .28rem
      .sel-icon
        font-size: .8rem
 </style>
