<template>
  <div class="progress-bar" ref="progressBar" @click="handleClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn" ref="progressBtn"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend="handleTouchEnd"
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
  data () {
    return {
      touch: {}
    }
  },
  methods: {
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style.left = `${offsetWidth}px`
    },
    handleClick (e) {
      this._offset(e.offsetX)
      this._triggerPercent()
    },
    handleTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    handleTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - document.documentElement.style.fontSize.replace('px', '') * 0.3, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    handleTouchEnd () {
      this.touch.initiated = false
      this._triggerPercent()
    },
    _triggerPercent () {
      const barWidth = this.$refs.progressBar.clientWidth - document.documentElement.style.fontSize.replace('px', '') * 0.3
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  },
  watch: {
    percent (newPercent) {
      if (newPercent > 1) {
        return
      }
      if (newPercent >= 0 && !this.touch.initiated) {
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
