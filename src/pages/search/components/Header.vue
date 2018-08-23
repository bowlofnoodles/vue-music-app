<template>
<div class="search-header">
  <div class="iconfont back-icon" @click="backHome">&#xe623;</div>
  <div class="search-input">
    <input type="text" placeholder="请输入关键字" v-model="searchKey" ref="searchKey" @keydown.enter="search" autofocus>
    <span class="iconfont del-icon" v-show="this.searchKey.length" @click="clearSearchInput">&#xe624;</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      searchKey: ''
    }
  },
  methods: {
    backHome () {
      this.$router.push('/')
    },
    search () {
      if (!this.searchKey) {
        return false
      } else {
        this.$store.commit('changeShowRes')
        this.$store.commit('changeSearchKey', this.searchKey)
        let target = this.$route.path === '/search/songs' || this.$route.path === '/search' ? '/search/songs' : this.$route.path
        this.$router.push(target)
      }
    },
    clearSearchInput () {
      this.searchKey = ''
      this.$refs.searchKey.focus()
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
