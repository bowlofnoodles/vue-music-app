<template>
<scroll ref="scroll">
  <div>
    <div class="brief">
      <div class="title">{{singer.name}}简介</div>
      <div class="txt">{{singer.briefDesc}}</div>
    </div>
    <div class="introduction" v-for="(item, index) of singer.introduction" :key="index">
      <div class="title">{{item.ti}}</div>
      <div class="txt" v-html="item.txt"></div>
    </div>
  </div>
</scroll>
</template>

<script>
import Scroll from 'base/scroll/Scroll'
export default {
  name: 'Intro',
  props: {
    singer: {
      type: Object
    }
  },
  components: {
    Scroll
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
  .title
    margin: .4rem 0 .4rem .2rem
    padding-left: .2rem
    border-left: 8px solid $theme-bgcolor
    font-weight: bold
  .txt
    padding: 0 .2rem
    line-height: .64rem
</style>
