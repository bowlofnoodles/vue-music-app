<template>
<div>
  <search-header></search-header>
  <div class="container" :class="{'fn-hide': showSearchRes}">
    <router-link tag="div" to="/singer" class="iconfont singer border-bottom">
      &#xe600;<span>歌手分类</span>
    </router-link>
    <search-hot :hot-list="hotList"></search-hot>
    <search-history></search-history>
  </div>
  <div class="search-res" :class="{'fn-hide': !showSearchRes}">
    <ul class="tab">
      <li class="tab-header">
        <router-link class="tab-header" to="/search/songs">单曲</router-link>
      </li>
      <li class="tab-header">
        <router-link class="tab-header" to="/search/singers">歌手</router-link>
      </li>
      <li class="tab-header">
        <router-link class="tab-header" to="/search/albums">专辑</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</div>
</template>

<script>
import SearchHeader from './components/Header'
import SearchHot from './components/Hot'
import SearchHistory from './components/History'
import { getSearchHot } from '@/api'
export default {
  name: 'Search',
  components: {
    SearchHeader,
    SearchHot,
    SearchHistory
  },
  data () {
    return {
      hotList: []
    }
  },
  computed: {
    showSearchRes () {
      return this.$store.state.showSearchRes
    }
  },
  methods: {
  },
  mounted () {
    getSearchHot().then((res) => {
      if (res && res.data) {
        let data = res.data.result
        this.hotList = data.hots
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .fn-hide
    display: none
  .container
    margin-top: $header-height
    .singer
      height: 1.24rem
      line-height: 1.24rem
      text-align: center
      font-size: $font-size-medium
      color: $font-color-l
      border-bottom: 1px solid $border-color
      span
        padding-left: .5em
  .search-res
    margin-top: $header-height
    .tab
      display: flex
      height: .94rem
      line-height: .94rem
      padding-bottom: .1rem
      background: $theme-bgcolor
      font-size: $font-size-small
      .tab-header
        width: 33.33%
        text-align: center
        color: $theme-color-d
        &.router-link-active
          color: $theme-color
          padding-bottom: .08rem
          border-bottom: 2px solid $theme-color
</style>
