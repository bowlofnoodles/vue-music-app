<template>
<ul class="wrapper">
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
</template>

<script>
export default {
  name: 'History'
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
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
</style>
