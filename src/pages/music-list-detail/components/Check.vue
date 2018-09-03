<template>
<div class="check">
  <base-header :title="`已选择${checkedNum}项`" @back="back">
    <div class="checkAll" @click="handleCheckAll">{{checkText}}</div>
  </base-header>
  <scroll class="container" ref="scroll">
    <div>
      <ul class="list">
        <li class="item" v-for="(item, index) of list" :key="item.id" @click="handleCheckItem(index)">
          <div class="iconfont check" ref="checkDOM">&#xe720;</div>
          <div class="info">
            <p class="name">{{item.name}}<span class="alias" v-if="item.alias.length">({{item.alias[0]}})</span></p>
            <div class="desc">{{item.concatArtists}} - {{item.album}}</div>
          </div>
        </li>
      </ul>
    </div>
  </scroll>
  <div class="icon-wrapper">
    <div class="item">
      <span class="iconfont">&#xe611;</span>
      <p class="icon-info">下一首播放</p>
    </div>
    <div class="item">
      <span class="iconfont">&#xe602;</span>
      <p class="icon-info">收藏歌曲</p>
    </div>
  </div>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
import Scroll from 'base/scroll/Scroll'
let checkType = ['&#xe720;', '&#xe721;']
export default {
  name: 'Check',
  props: {
    list: {
      type: Array
    }
  },
  components: {
    BaseHeader,
    Scroll
  },
  data () {
    return {
      checked: []
    }
  },
  computed: {
    checkedNum () {
      return this.checked.filter((item) => {
        return item === 1
      }).length
    },
    checkText () {
      return this.checkedNum === this.list.length ? '取消全选' : '全选'
    }
  },
  methods: {
    back () {
      this.$emit('changeShowCheck')
    },
    scrollRefresh () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },
    handleCheckItem (index) {
      let check = this.$refs.checkDOM[index]
      let checked = this.checked[index]
      check.innerHTML = checkType[1 - checked]
      this.checked.splice(index, 1, 1 - checked)
    },
    handleCheckAll (e) {
      let checked = this.checkedNum === this.list.length
      for (let i = 0; i < this.checked.length; i++) {
        this.$set(this.checked, i, 1 - checked)
      }
      this.$refs.checkDOM.forEach(item => {
        item.innerHTML = checkType[1 - checked]
      })
    }
  },
  watch: {
    list (list) {
      this.checked.length = list.length
      this.checked.fill(0)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .checkAll
    position: absolute
    top: 0
    right: .4rem
    font-size: $font-size-medium
  .container
    position: absolute
    left: 0
    right: 0
    top: $header-height
    bottom: 0
    margin-bottom: $header-height
    .item
      display: flex
      align-items: center
      height: 1.8rem
      border-bottom: 1px solid $border-color
      .check
        width: 1.12rem
        text-align: center
        color: $font-color-l
        &.iconfont
          font-size: $font-size-large
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
  .icon-wrapper
    overflow: hidden
    position: fixed
    bottom: 0
    left: 0
    right: 0
    display: flex
    justify-content: space-around
    align-items: center
    height: $header-height
    border-top: 1px solid $border-color
    background: $theme-color
    z-index: 99
    .item
      display: flex
      flex-direction: column
      align-items: center
      .iconfont
        font-size: $font-size-large
      .icon-info
        padding-top: 10%
        color: $font-color-l
</style>
