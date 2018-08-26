<template>
<div class="header">
  <div class="iconfont slider-icon">&#xe9d6;</div>
  <div class="iconfont middle-icon-wrapper">
    <router-link tag="span" to="/mv">
      &#xe667;
    </router-link>
    <router-link tag="span" to="/recommend">
      &#xe9d5;
    </router-link>
    <router-link tag="span" to="/user">
      &#xe6a8;
    </router-link>
  </div>
  <router-link tag="div" to="/search" class="iconfont search-icon">
    &#xe60a;
  </router-link>
</div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .header >>> .iconfont
    font-size: .74rem
  .header
    display: flex
    z-index: 99
    header-fixed()
    .slider-icon
      padding: 0 .26rem
    .middle-icon-wrapper
      flex: 1
      text-align: center
      color: $theme-color-d
      span
        padding: 0 .24rem
        cursor: pointer
        &.router-link-active
          color: $theme-color
          font-size: .78rem
    .search-icon
      padding: 0 .26rem
      cursor: pointer
</style>
