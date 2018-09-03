<template>
<div class="header">
  <div class="iconfont back-icon" @click="back">&#xe623;</div>
  <div class="middle-wrapper">{{this.title}}
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String
    },
    routerBack: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      if (this.routerBack) {
        this.$router.back()
      } else {
        this.$emit('back')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .header
    display: flex
    z-index: 99
    header-fixed()
    .back-icon
      padding: 0 .36rem
      font-size: .68rem
    .middle-wrapper
      position: relative
      flex: 1
      font-size: $font-size-medium-x
      no-wrap()
  </style>
