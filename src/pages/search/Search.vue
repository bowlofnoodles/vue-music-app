<template>
<div>
  <search-header @search="search" ref="searchHeader"></search-header>
  <div class="container" v-show="!showSearchRes">
    <div class="title">热门搜索</div>
    <div class="hot-key-wrapper">
      <ul>
        <li class="search-hot-key" v-for="(item, index) of searchHots" :key="index" @click="setQuery(item.first)">{{item.first}}</li>
      </ul>
    </div>
    <ul class="his-wrapper">
      <li class="search-item">
        <div class="iconfont his-icon">&#xe60d;</div>
        <div class="item-content">
          华晨宇
          <span class="iconfont del-icon">&#xe624;</span>
        </div>
      </li>
      <li class="search-item">
        <div class="iconfont his-icon">&#xe60d;</div>
        <div class="item-content">
          华晨宇
          <span class="iconfont del-icon">&#xe624;</span>
        </div>
      </li>
      <li class="search-item">
        <div class="iconfont his-icon">&#xe60d;</div>
        <div class="item-content">
          华晨宇
          <span class="iconfont del-icon">&#xe624;</span>
        </div>
      </li>
      <li class="search-item">
        <div class="iconfont his-icon">&#xe60d;</div>
        <div class="item-content">
          华晨宇
          <span class="iconfont del-icon">&#xe624;</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="search-res" v-show="showSearchRes">
    <ul class="tab">
      <li class="tab-header">
        <router-link class="tab-header" :to="{name: 'SearchSongs', query:{'keywords': this.keywords}, params: {type: 1}}">单曲</router-link>
      </li>
      <li class="tab-header">
        <router-link class="tab-header" :to="{name: 'SearchSingers', query:{'keywords': this.keywords}}">歌手</router-link>
      </li>
      <li class="tab-header">
        <router-link class="tab-header" :to="{name: 'SearchMusicLists', query:{'keywords': this.keywords}}">歌单</router-link>
      </li>
    </ul>
    <div class="result">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</div>
</template>

<script>
import SearchHeader from 'base/search-header/SearchHeader'
import { getSearchHot } from 'api/search'
import { mapGetters, mapMutations } from 'vuex'
import Loading from 'base/loading/Loading'
export default {
  name: 'Search',
  components: {
    SearchHeader,
    Loading
  },
  data () {
    return {
      searchHots: [],
      keywords: ''
    }
  },
  computed: {
    type () {
      return this.$route.path.split('/')[2] || 1
    },
    ...mapGetters(['showSearchRes'])
  },
  methods: {
    setQuery (query) {
      const searchHeader = this.$refs.searchHeader
      searchHeader.setQuery(query)
      searchHeader.search()
    },
    search (keywords) {
      this.keywords = keywords
      if (!this.showSearchRes) {
        this.setShowSearchRes(true)
      }
      this.$router.push(`/search/${this.type}?keywords=${keywords}`)
    },
    getSearchHot () {
      getSearchHot().then(res => {
        if (res && res.result) {
          this.searchHots = res.result.hots
        }
      })
    },
    ...mapMutations({
      setShowSearchRes: 'SET_SHOW_SEARCH_RES'
    })
  },
  mounted () {
    this.getSearchHot()
  },
  beforeRouteLeave (to, from, next) {
    this.setShowSearchRes(false)
    next()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .container
    margin-top: $header-height
    .title
      padding: .5rem 0 .2rem .2rem
      color: $font-color-l
    .search-hot-key
      display: inline-block
      padding: .2rem .2rem
      margin: .12rem
      border: 1px solid $border-color
      border-radius: .5rem
      font-size: $font-size-small
    .his-wrapper
      .search-item
        display: flex
        height: 1.24rem
        line-height: 1.24rem
        .his-icon
          padding: 0 .2rem
          color: $font-color-l
        .item-content
          color: #333
          flex: 1
          overflow: hidden
          border-bottom: 1px solid $border-color
          .del-icon
            float: right
            padding-right: .2rem
            color: $font-color-l
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
    .tab
      position: fixed
      top: 1.3rem
      width: 100%
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
    .result
      margin-top: 2.6rem
</style>
