<template>
<div class="category">
  <base-header title="选择分类" @back="back"></base-header>
  <scroll class="container" ref="scroll">
    <div class="content">
      <div class="all" :class="{current: '全部' == currentCat}">全部歌单</div>
      <loading v-show="showLoading"></loading>
      <div class="cate" v-show="!showLoading" v-for="(value, key) of catList" :key="key">
        <p class="cate-title"><span class="iconfont" v-html="iconType[key]"></span>{{key}}</p>
        <div class="item-wrapper">
          <div class="item"
            :class="{current: item.name == currentCat}"
            v-for="item of value"
            :key="item.name"
            @click="changeCat(item.name)"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
  </scroll>
</div>
</template>
<script>
import BaseHeader from 'base/header/Header'
import { getCatList } from 'api/music-list'
import Loading from 'base/loading/Loading'
import Scroll from 'base/scroll/Scroll'
import { playlistMixin } from 'common/js/mixin'
export default {
  name: 'Category',
  mixins: [playlistMixin],
  props: {
    currentCat: {
      type: String
    }
  },
  components: {
    BaseHeader,
    Loading,
    Scroll
  },
  data () {
    return {
      catList: {},
      showLoading: true,
      iconType: {
        '语种': '&#xe747;',
        '风格': '&#xe630;',
        '场景': '&#xe677;',
        '情感': '&#xe680;',
        '主题': '&#xe60f;'
      }
    }
  },
  methods: {
    back () {
      this.$emit('changeShowCate')
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '1.4rem' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      setTimeout(() => {
        this.$refs.scroll.refresh()
      })
    },
    scrollRefresh () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      })
    },
    changeCat (cat) {
      this.back()
      this.$emit('changeCat', cat)
    },
    convertToCatList (categories, sub) {
      sub.forEach(item => {
        if (!this.catList[categories[item.category]]) {
          this.catList[categories[item.category]] = []
        }
        this.catList[categories[item.category]].push({
          name: item.name,
          hot: item.hot
        })
      })
    }
  },
  mounted () {
    getCatList().then(res => {
      if (res && res.data && res.data.categories && res.data.sub) {
        let categories = res.data.categories
        let sub = res.data.sub
        this.convertToCatList(categories, sub)
        this.showLoading = false
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .container >>> .iconfont
    font-size: $font-size-medium-x
    padding-right: .08rem
  .category >>> .current
    border: 1px solid #000
  .category
    .container
      position: absolute
      top: $header-height
      left: 0
      right: 0
      bottom: 0
      // overflow: hidden
      .content
        padding-top: .1rem
      .all
        margin: 0 .1rem
        padding: .3rem 0
        text-align: center
        font-size: $font-size-medium
      .cate
        .cate-title
          color: $font-color-l
          padding: .4rem 0 .34rem .2rem
          font-size: $font-size-medium
        .item-wrapper
          display: flex
          flex-wrap: wrap
          .item
            box-sizing: border-box
            width: 22.5%
            padding: .4rem 0
            margin-left: .2rem
            margin-bottom: .2rem
            border: 1px solid $border-color
            text-align: center
            &.current
              border: 1px solid #000
</style>
