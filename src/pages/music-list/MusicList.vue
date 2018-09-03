<template>
<div>
  <base-header title="歌单" :router-back="true"></base-header>
  <scroll class="container"
    v-show="!showCate"
    :pullup="true"
    @scrollToEnd = "getHotMusicList"
    ref="scroll"
  >
    <div>
      <div class="wonder-music">
        <div class="bg-blur"></div>
        <div class="wonder-wrap">
          <div class="img-wrapper">
          <img  class="img" src="http://p1.music.126.net/KS7kCUfX3ydJ5bSwCMXC_w==/3417282145777733.jpg">
          </div>
          <div class="desc">
            <h2 class="title">精品歌单<span class="iconfont more-icon">&#xe617;</span></h2>
            <p class="name">日式夜晚°霓虹街灯下</p>
            <p class="copywriter">夏天结束了，我们在霓虹灯下跳最后一支舞吧</p>
          </div>
        </div>
      </div>
      <div class="title-wrapper">
        <div class="cate-btn" @click="changeShowCate"><a ref="categoryBtn">全部</a><span class="iconfont">&#xe617;</span></div>
        <ul class="hot-cate">
          <li @click="changeCat('全部')">全部</li>
          <li @click="changeCat('华语')">华语</li>
          <li @click="changeCat('民谣')">民谣</li>
          <li @click="changeCat('欧美')">欧美</li>
        </ul>
      </div>
      <loading v-show="showLoading"></loading>
      <music-list :music-list-data="musicListData" v-show="!showLoading"></music-list>
    </div>
  </scroll>
  <category v-show="showCate" @changeShowCate="changeShowCate" @changeCat="changeCat" :current-cat="cat" ref="cate"></category>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
import MusicList from 'base/music-list/MusicList'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import Category from './components/Category'
import { getHotMusicList } from 'api/music-list'
import { convertCount } from 'common/js/util'
export default {
  components: {
    BaseHeader,
    MusicList,
    Category,
    Scroll,
    Loading
  },
  data () {
    return {
      musicListData: [],
      catList: [],
      cat: '全部',
      limit: 21, // 为了让3整除
      offset: 0,
      showCate: false,
      showLoading: true,
      showpullUpLoading: false
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    convertPlayCount (num) {
      return convertCount(num)
    },
    getHotMusicList (flag) {
      if (flag) {
        this.offset = 0
        this.musicListData = []
      } else {
        this.offset += 21
        this.showpullUpLoading = true
      }
      getHotMusicList(this.cat, this.limit, this.offset).then(res => {
        if (res && res.data && res.data.playlists) {
          this.getHotMusicListSucc(res.data.playlists, flag)
        }
      })
    },
    getHotMusicListSucc (data, flag) {
      let tempData = []
      data.forEach((item) => {
        tempData.push({
          id: item.id,
          name: item.name,
          picUrl: item.coverImgUrl,
          playCount: this.convertPlayCount(item.playCount)
        })
      })
      this.musicListData = this.musicListData.concat(tempData)
      this.showLoading = false
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.showpullUpLoading = false
      }, 20)
    },
    changeCat (cat) {
      this.cat = cat
      this.$refs.categoryBtn.innerText = cat
    },
    changeShowCate () {
      this.showCate = !this.showCate
      if (this.showCate) {
        this.$refs.cate.scrollRefresh()
      }
    }
  },
  mounted () {
    this.getHotMusicList(true)
  },
  watch: {
    cat () {
      this.showLoading = true
      this.getHotMusicList(true)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .header
    display: flex
    z-index: 99
    header-fixed()
    .back-icon
      padding: 0 .36rem
      font-size: .68rem
    .middle-wrapper
      flex: 1
      font-size: $font-size-medium-x
  .container
    overflow: hidden
    position: absolute
    left: 0
    right: 0
    top: $header-height
    bottom: 0
    .wonder-music
      position: relative
      overflow: hidden
      .bg-blur
        background: url('http://p1.music.126.net/KS7kCUfX3ydJ5bSwCMXC_w==/3417282145777733.jpg')
        background-repeat: no-repeat
        background-position: 50%
        background-size: cover
        filter: blur(25px)
        transform: scale(1.5);
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
      .wonder-wrap
        display: flex
        position: relative
        overflow: hidden
        align-items: center
        width: 100%
        height: 3.4rem
        color: $theme-color
        z-index: 2
        .img-wrapper
          width: 25%
          height: 0
          padding-bottom: 25%
          margin-left: .24rem
          .img
            width: 100%
            border-radius: .1rem
        .desc
          padding-left: .32rem
          .title
            padding-bottom: .4rem
          .name
            font-size: $font-size-medium
            padding-bottom: .24rem
          .copywriter
            color: #aaa
    .title-wrapper
      display: flex
      justify-content:space-between
      align-items: center
      overflow: hidden
      height: 1.4rem
      .cate-btn
        padding: .1rem .26rem .16rem
        margin-left: .2rem
        border-radius: .6rem
        border: 1px solid $border-color
      .hot-cate
        display: flex
        li
          padding: 0 .2rem
</style>
