<template>
<div>
  <ul class="list">
    <li class="item" v-for="(item, id) of list" :key="item.id" @click="selectItem(item, id)">
      <div class="range">{{id+1}}</div>
      <div class="info">
        <p class="name">{{item.name}}<span class="alias" v-if="item.alia">({{item.alia}})</span></p>
        <div class="desc">{{item.singers}} - {{item.album}}</div>
      </div>
      <div class="icon-wrap">
        <!-- <span class="iconfont mv-icon">&#xe667;</span> -->
        <span class="iconfont sel-icon">&#xe6b9;</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongList',
  props: {
    list: Array,
    default: []
  },
  methods: {
    selectItem (item, index) {
      this.selectPlay({
        list: this.list,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
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
      width: 1.12rem
      text-align: center
      font-size: $font-size-medium
      color: $font-color-l
    .info
      overflow: hidden
      flex: 1
      .name
        font-size: $font-size-medium
        padding-bottom: .1rem
        no-wrap()
        .alias
          padding-left: .08rem
          color: $font-color-l
      .desc
        padding-top: .1rem
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
