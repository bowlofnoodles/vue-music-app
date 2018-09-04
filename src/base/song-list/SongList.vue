<template>
<div>
  <ul class="list">
    <li class="item" v-for="(item, id) of list" :key="item.id" @click="selectItem(item, id)">
      <div class="range">{{id+1}}</div>
      <div class="info">
        <p class="name">{{item.name}}<span class="alias" v-if="item.alias.length">({{item.alias[0]}})</span></p>
        <div class="desc">{{item.concatArtists}} - {{item.album}}</div>
      </div>
      <div class="icon-wrap">
        <span class="iconfont mv-icon">&#xe667;</span>
        <span class="iconfont sel-icon">&#xe6b9;</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import { getMusicUrl } from 'api/music'
import { findIndex } from 'common/js/util'
import { mapActions } from 'vuex'
export default {
  name: 'SongList',
  props: {
    list: Array,
    default: []
  },
  methods: {
    concatSingers (singers) {
      let result = ''
      singers.forEach((val, index) => {
        if (index === 0) {
          result += val.name
        } else {
          result += `/${val.name}`
        }
      })
      return result
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.list,
        index
      })
    },
    getMusicUrl (id) {
      getMusicUrl(id.join(',')).then(res => {
        if (res && res.data && res.data.data) {
          this.getMusicUrlSucc(res.data.data)
        }
      })
    },
    getMusicUrlSucc (data) {
      this.list.forEach((item) => {
        item.url = data[findIndex(data, 'id', item.id)].url
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  watch: {
    list () {
      if (this.list.length) {
        let id = []
        this.list.forEach((val) => {
          val.concatArtists = this.concatSingers(val.artists)
          id.push(val.id)
        })
        this.getMusicUrl(id)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .hightlight
    color: $highlight-color
  .item
    display: flex
    align-items: center
    height: 1.8rem
    border-bottom: 1px solid $border-color
    .range
      width: 1.12rem
      text-align: center
      font-size: $font-size-medium
      color: $font-color-l
    .info
      overflow: hidden
      flex: 1
      .name
        font-size: $font-size-medium
        padding-bottom: .2rem
        no-wrap()
        .alias
          padding-left: .08rem
          color: $font-color-l
      .desc
        color: $font-color-l
        no-wrap()
    .icon-wrap
      color: $font-color-tran-l
      .mv-icon
        font-size: .6rem
        padding-right: .28rem
      .sel-icon
        font-size: .8rem
 </style>
