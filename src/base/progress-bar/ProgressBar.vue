<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn" ref="progressBtn"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style.left = `${offsetWidth}px`
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent > 1) {
        return
      }
      if (newPercent >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth - document.documentElement.style.fontSize.replace('px', '') * 0.3
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/style/variable.styl"

  .progress-bar
    height: .5rem
    .bar-inner
      position: relative
      top: .18rem
      height: .05rem
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        // width: 100%
        height: 100%
        background: #ff0000
      .progress-btn
        box-sizing: border-box
        position: absolute
        top: -.125rem
        // left: -.15rem
        width: .3rem
        height: .3rem
        border-radius: 50%
        background: $theme-color
</style>
