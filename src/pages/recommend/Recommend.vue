<template>
<scroll class="recommend">
  <div>
    <div class="swiper-container">
      <swiper :options="swiperOption" v-if="showSwiper">
        <swiper-slide v-for="(item, id) of banners" :key="id">
          <a class="swiper-img-wrapper" :href="item.url">
            <img :src="item.picUrl" class="swiper-img"/>
          </a>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <div class="icon-wrapper">
      <router-link tag="div" class="icon-item" to="/dailyrecommend">
        <div class="icon-type">
          <span class="iconfont">&#xe652;</span>
        </div>
        <p class="icon-title">每日推荐</p>
      </router-link>
      <router-link tag="div" class="icon-item" to="/rank">
        <div class="icon-type">
          <span class="iconfont">&#xe608;</span>
        </div>
        <p class="icon-title">排行榜</p>
      </router-link>
      <router-link tag="div" class="icon-item" to="/music-list">
        <div class="icon-type">
          <span class="iconfont">&#xe61d;</span>
        </div>
        <p class="icon-title">歌单</p>
      </router-link>
      <router-link tag="div" class="icon-item" to="/singer">
        <div class="icon-type">
          <span class="iconfont">&#xe600;</span>
        </div>
        <p class="icon-title">歌手</p>
      </router-link>
      <router-link tag="div" class="icon-item" to="/fm">
        <div class="icon-type">
          <span class="iconfont">&#xe6da;</span>
        </div>
        <p class="icon-title">电台</p>
      </router-link>
    </div>
    <h2 class="title">推荐歌单<span class="iconfont">&#xe617;</span></h2>
    <div class="music-list-wrapper">
      <div class="item" v-for="item of musicListData" :key="item.id">
        <div class="img-wrapper">
          <img :src="item.picUrl">
          <div class="number"><span class="iconfont">&#xe885;</span>{{item.playCount}}</div>
        </div>
        <p class="desc">{{item.name}}</p>
      </div>
    </div>
    <h2 class="title">最新音乐</h2>
    <music-list :list="newMusicList"></music-list>
  </div>
</scroll>
</template>

<script>
import MusicList from 'base/music-list/MusicList'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getBanner, getMusicList, getNewMusic } from 'api/recommend'
import { convertCount } from 'common/js/util'
import { recMusicListLen } from 'common/js/config'
import scroll from 'base/scroll/Scroll'
export default {
  name: 'Recommend',
  components: {
    MusicList,
    swiper,
    swiperSlide,
    scroll
  },
  data () {
    return {
      banners: [],
      musicListData: [],
      swiperOption: {
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      newMusicList: []
    }
  },
  computed: {
    showSwiper () {
      return this.banners.length
    }
  },
  methods: {
    convertPlayCount (num) {
      return convertCount(num)
    },
    playMusic (id) {
    }
  },
  created () {
    getBanner().then((res) => {
      if (res && res.data && res.data.banners) {
        let banners = res.data.banners
        this.banners = banners
      }
    })
    getMusicList().then((res) => {
      if (res && res.data && res.data.result) {
        for (let i = 0; i < recMusicListLen; i++) {
          res.data.result[i].playCount = this.convertPlayCount(res.data.result[i].playCount)
        }
        this.musicListData = res.data.result.slice(0, recMusicListLen)
      }
    })
    getNewMusic().then((res) => {
      if (res && res.data && res.data.result) {
        this.newMusicList = res.data.result
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .recommend
    height: calc(100vh - 1.706667rem)
  .swiper-container >>> .swiper-pagination-bullet
    width: .2rem
    height: .2rem
    border-radius: 50%
    background: $theme-color-d
  .swiper-container >>> .swiper-pagination-bullet-active
    background: $theme-bgcolor
  .swiper-container
    height: 0
    padding-bottom: 46%
    background: #eee
    .swiper-img-wrapper
      display: block
      width: 100%
      height: 0
      padding-bottom: 46%
      .swiper-img
        width: 100%
  .icon-wrapper
    display: flex
    height: 3rem
    align-items: center
    border-bottom: 1px solid $border-color
    .icon-item
      width: 20%
      text-align: center
      .icon-type
        display: flex
        justify-content: center
        align-items: center
        width: 1.4rem
        height: 1.4rem
        margin: 0 auto
        border-radius: 100%
        background: $theme-bgcolor
        .iconfont
          font-size: $font-size-large
          color: $theme-color
      .icon-title
        padding-top: .2rem
  .title
    margin: .6rem 0 .4rem .2rem
    .iconfont
      color: $font-color-l
  .music-list-wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    overflow: hidden
    margin: 0 .2rem
    .item
      width: 33%
      .img-wrapper
        position: relative
        display: block
        height: 0
        padding-bottom: 100%
        img
          width: 100%
          border-radius: .1rem
        .number
          position: absolute
          top: .1rem
          right: .1rem
          color: $theme-color
          font-size: .36rem
          .iconfont
            padding-right: .04rem
      .desc
        margin: .2rem 0
        ellipsis(2)
</style>
