<template>
<div>
  <div class="category" v-show="!showList">
    <base-header title="歌手分类" @back="cateBack"></base-header>
    <scroll class="container" ref="scroll">
      <div @click="showSingerList">
        <div class="list" role="china">
          <div class="item" :data-cate="singerCateList.HuaMan">华语男歌手</div>
          <div class="item" :data-cate="singerCateList.HuaWoman">华语女歌手</div>
          <div class="item" :data-cate="singerCateList.HuaGroup">华语乐队/组合</div>
        </div>
        <div class="list" role="ua">
          <div class="item" :data-cate="singerCateList.UAMan">欧美男歌手</div>
          <div class="item" :data-cate="singerCateList.UAWoman">欧美女歌手</div>
          <div class="item" :data-cate="singerCateList.UAGroup">欧美乐队/组合</div>
        </div>
        <div class="list" role="japan">
          <div class="item" :data-cate="singerCateList.JapanMan">日本男歌手</div>
          <div class="item" :data-cate="singerCateList.JapanWoman">日本女歌手</div>
          <div class="item" :data-cate="singerCateList.JapanGroup">日本乐队/组合</div>
        </div>
        <div class="list" role="korean">
          <div class="item" :data-cate="singerCateList.KoreanMan">韩国男歌手</div>
          <div class="item" :data-cate="singerCateList.KoreanWoman">韩国女歌手</div>
          <div class="item" :data-cate="singerCateList.KoreanGroup">韩国乐队/组合</div>
        </div>
        <div class="list" role="other">
          <div class="item" :data-cate="singerCateList.OtherMan">其他男歌手</div>
          <div class="item" :data-cate="singerCateList.OtherWoman">其他女歌手</div>
          <div class="item" :data-cate="singerCateList.OtherGroup">其他乐队/组合</div>
        </div>
      </div>
    </scroll>
  </div>
  <div class="singer-list" v-show="showList">
    <base-header :title="`${title}-${initial}`" @back="back">
      <div class="filter-btn" @click.stop="showLayer">筛选</div>
    </base-header>
    <div class="layer" @click="handleLayerClick" v-show="showFilterList">
      <scroll class="filter-list" @click.native.stop="handleFileterListClick" ref="filterListScroll">
        <div>
          <h3 class="title" @click.stop="() => {}">请选择</h3>
          <div class="select-item" v-for="(item, index) of letterList" :data-initial="item" :key="index">
            {{item}}
            <div class="gou" v-show="initial === item">√</div>
          </div>
        </div>
      </scroll>
    </div>
    <scroll class="container" :pullup="true" @scrollToEnd="getSingerList" ref="scroll1">
      <div>
        <loading v-show="showLoading"></loading>
        <singer-list :list="singerData" @select="toSingerDetail" :showLoading="showPullUpLoading"></singer-list>
      </div>
    </scroll>
  </div>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
import Scroll from 'base/scroll/Scroll'
import SingerList from 'pages/singer/components/SingerList'
import Loading from 'base/loading/Loading'
import { singerCate } from 'common/js/config'
import { getSingerList } from 'api/singer'
import { playlistMixin } from 'common/js/mixin'
export default {
  name: 'SingerCate',
  mixins: [playlistMixin],
  components: {
    BaseHeader,
    Scroll,
    SingerList,
    Loading
  },
  data () {
    return {
      showList: false,
      showLoading: true,
      showPullUpLoading: false,
      showFilterList: false,
      title: '',
      cate: singerCate.HuaMan,
      singerCateList: singerCate,
      limit: 20,
      offset: 0,
      initial: '热门歌手',
      singerData: [],
      more: true,
      letterList: ['热门歌手', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }
  },
  methods: {
    cateBack () {
      this.$router.push('/singer')
    },
    back () {
      this.showList = false
    },
    showLayer () {
      this.showFilterList = true
      setTimeout(() => {
        this.$refs.filterListScroll.refresh()
      }, 20)
    },
    toSingerDetail (id) {
      this.$router.push(`/singer-detail/${id}`)
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '1.4rem' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
      this.$refs.scroll1.$el.style.bottom = bottom
      this.$refs.scroll1.refresh()
    },
    handleLayerClick () {
      this.showFilterList = false
    },
    handleFileterListClick (e) {
      console.log(e.target.dataset.initial)
      this.initial = e.target.dataset.initial
      this.showFilterList = false
      this.getSingerList(true)
    },
    showSingerList (e) {
      this.title = e.target.innerText
      this.cate = e.target.dataset.cate
      this.initial = '热门歌手'
      this.showList = true
      this.getSingerList(true)
    },
    getSingerList (flag) {
      // 没有更多的歌手
      // flag为true代表第一次请求、false代表在请求下一页 offset加上相应值
      if (flag) {
        this.offset = 0
        this.singerData = []
      } else {
        this.offset += 20
        if (!this.more) {
          return
        }
      }
      let initail = this.initial === '热门歌手' ? '' : this.initial
      getSingerList(this.cate, initail, this.limit, this.offset).then(res => {
        if (res && res.artists) {
          this.more = res.more
          if (!res.more) {
            this.showPullUpLoading = false
          } else {
            this.showPullUpLoading = true
          }
          this.singerData = this.singerData.concat(res.artists)
          this.showLoading = false
        }
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.scroll.refresh()
    }, 20)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .filter-btn
    float: right
    padding-right: .2rem
  .container
    position: absolute
    top: $header-height
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    .list
      .item
        box-sizing: border-box
        height: 1.2rem
        line-height: 1.2rem
        padding-left: .2rem
        border-bottom: 1px solid $border-color
  .singer-list
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: $theme-color
    .layer
      position: relative
      width: 100%
      height: 100%
      z-index: 100
      background: rgba(0, 0, 0, .5)
      overflow: hidden
    .filter-list
      position: absolute
      top: 1.8rem
      bottom: 0.4rem
      left: 0
      right: 0
      width: 80%
      margin: 0 auto
      z-index: 101
      background: $theme-color
      overflow: hidden
      .title
        padding: .4rem 0 .4rem .4rem
      .select-item
        height: 1rem
        line-height: 1rem
        padding-left: .4rem
        border-top: 1px solid $border-color
        overflow: hidden
        .gou
          float: right
          padding-right: .4rem
          font-weight: bold
          font-size: $font-size-medium
    .container
      position: absolute
      top: $header-height
      bottom: 0
      left: 0
      right: 0
</style>
