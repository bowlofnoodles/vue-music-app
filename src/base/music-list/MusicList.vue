<template>
<div>
  <div class="music-list-wrapper">
    <div class="item" v-for="item of musicListData" :key="item.id" @click="showMusicDetail(item.id)">
      <div class="img-wrapper">
        <img :src="item.picUrl">
        <div class="number"><span class="iconfont">&#xe885;</span>{{item.playCount}}</div>
      </div>
      <p class="desc">{{item.name}}</p>
    </div>
  </div>
  <loading v-show="showLoading"></loading>
</div>
</template>

<script>
import Loading from 'base/loading/Loading'
export default {
  name: 'MusicList',
  components: {
    Loading
  },
  props: {
    showLoading: {
      type: Boolean,
      default: true
    },
    musicListData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    showMusicDetail (id) {
      this.$router.push(`/music-list-detail/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
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
          &:after
            content: " "
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: .48rem
            z-index: 2
            background-image: linear-gradient(180deg,rgba(0,0,0,.2),transparent)
          img
            position: absolute
            width: 100%
            left: 0
            top: 0
            z-index: 1
            border-radius: .1rem
          .number
            position: absolute
            top: .1rem
            right: .1rem
            z-index: 3
            font-size: .36rem
            color: $theme-color
            text-shadow()
            .iconfont
              padding-right: .04rem
        .desc
          margin: .2rem 0
          line-height: 1.5
          ellipsis(2)
</style>
