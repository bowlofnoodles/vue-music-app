<template>
<div>
  <div class="title">热门搜索</div>
  <div class="hot-key-wrapper">
    <ul>
      <li class="search-hot-key"></li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'Hot'
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .title
    padding: .5rem 0 .2rem .2rem
    color: $font-color-l
  .search-hot-key
    display: inline-block
    padding: .2rem .2rem
    margin: .12rem
    border: 1px solid $border-color
    border-radius: .5rem
    font-size: $font-size-medium
</style>
