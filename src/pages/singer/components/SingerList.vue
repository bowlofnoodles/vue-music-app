<template>
<div class="list">
  <div class="item" v-for="item of list" :key="item.id" @click="selectItem(item.id)">
    <div class="img-wrapper">
      <img v-lazy="item.img1v1Url" class="img"/>
    </div>
    <div class="name">
      {{item.name}}
    </div>
  </div>
  <loading v-show="showLoading"></loading>
</div>
</template>

<script>
import Loading from 'base/loading/Loading'
export default {
  name: 'SingerList',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    showLoading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    selectItem (id) {
      this.$emit('select', id)
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  .item
    display: flex
    align-items: center
    height: 2.4rem
    border-bottom: 1px solid $border-color
    .img-wrapper
      width: 20%
      height: 2rem
      margin-left: .2rem
      .img
        width: 100%
        height: 100%
    .name
      margin-left: .4rem
</style>
