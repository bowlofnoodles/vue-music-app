<template>
<div>
  <search-header></search-header>
  <div class="container">
    <router-link tag="div" to="/singer" class="iconfont singer border-bottom">
      &#xe600;<span>歌手分类</span>
    </router-link>
    <search-hot></search-hot>
    <search-history></search-history>
  </div>
  <div class="search-res" style="display: none">
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
import SearchHeader from 'base/search-header/SearchHeader'
import SearchHot from './components/Hot'
import SearchHistory from './components/History'
export default {
  name: 'Search',
  components: {
    SearchHeader,
    SearchHot,
    SearchHistory
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
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
