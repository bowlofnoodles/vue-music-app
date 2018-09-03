<template>
<div class="search-header">
  <div class="iconfont back-icon" @click="back">&#xe623;</div>
  <div class="search-input">
    <input type="text" placeholder="请输入关键字" v-model="query" @keydown.enter="search" ref="searchInput" autofocus>
    <span class="iconfont del-icon" v-show="this.query.length" @click="clear">&#xe624;</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchHeader',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    setQuery (query) {
      this.query = query
    },
    search () {
      if (!this.searchKey) return
      this.$emit('search', this.searchKey.trim())
    },
    clear () {
      this.query = ''
      this.$refs.searchInput.focus()
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .search-header >>> .iconfont
    font-size: .68rem
  .search-header
    display: flex
    header-fixed()
    .back-icon
      padding: 0 .36rem
      cursor: pointer
    .search-input
      flex: 1
      margin-bottom: .28rem
      margin-right: .28rem
      border-bottom: 1px solid $border-color
      background: $theme-bgcolor
      input
        background: transparent
        box-sizing: border-box
        width: 92%
        padding: .2rem 0
        outline: none
        border-width: 0
        color: $theme-color-d
        font-size: $font-size-medium-x
      .del-icon
        font-size: $font-size-medium-x
</style>
