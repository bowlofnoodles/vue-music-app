<template>
<div>
  <ul class="list">
    <li class="item">
      <div class="info">
        <p class="name">海阔天空</p>
        <div class="desc">Beyond - 华纳23周年纪念精选系列</div>
      </div>
      <div class="icon-wrap">
        <span class="iconfont mv-icon">&#xe667;</span>
        <span class="iconfont sel-icon">&#xe6b9;</span>
      </div>
    </li>
    <li class="item">
      <div class="info">
        <p class="name">海阔天空</p>
        <div class="desc">Beyond - 华纳23周年纪念精选系列</div>
      </div>
      <div class="icon-wrap">
        <span class="iconfont mv-icon">&#xe667;</span>
        <span class="iconfont sel-icon">&#xe6b9;</span>
      </div>
    </li>
    <li class="item">
      <div class="info">
        <p class="name">海阔天空</p>
        <div class="desc">Beyond - 华纳23周年纪念精选系列</div>
      </div>
      <div class="icon-wrap">
        <span class="iconfont mv-icon">&#xe667;</span>
        <span class="iconfont sel-icon">&#xe6b9;</span>
      </div>
    </li>
    <li class="item">
      <div class="info">
        <p class="name">海阔天空</p>
        <div class="desc">Beyond - 华纳23周年纪念精选系列</div>
      </div>
      <div class="icon-wrap">
        <span class="iconfont mv-icon">&#xe667;</span>
        <span class="iconfont sel-icon">&#xe6b9;</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'SearchSongs'
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
    padding-left: .24rem
    border-bottom: 1px solid $border-color
    .info
      overflow: hidden
      flex: 1
      .name
        font-size: $font-size-medium
        padding-bottom: .2rem
        no-wrap()
      .desc
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
