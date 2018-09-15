<template>
<div>
  <base-header title="排行榜" :router-back="true"></base-header>
  <scroll class="container" ref="scroll" :data="globalMusicList">
    <div>
      <loading v-show="showLoading"></loading>
      <div role="content" v-show="!showLoading">
        <div class="title">官方榜</div>
        <div class="official-list">
          <div class="item" v-for="item of officialMusicList" :key="item.id" @click="showMusicDetail(item.id)">
            <div class="img-wrapper">
              <img v-lazy="item.picUrl" class="img">
            </div>
            <ol class="top3-list">
              <li class="list-item"
                v-for="song of item.songListData.slice(0, 3)"
                :key="song.id"
              ><span role="name">{{song.name}}</span>-<span role="singer">{{song.singers}}</span></li>
            </ol>
          </div>
        </div>
        <div class="title">全球榜</div>
        <div class="global-list">
          <music-list :musicListData="globalMusicList" :showLoading="false"></music-list>
        </div>
      </div>
    </div>
  </scroll>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
import MusicList from 'base/music-list/MusicList'
import Scroll from 'base/scroll/Scroll'
import Loading from 'base/loading/Loading'
import { getRankList } from 'api/rank'
import { createMusicList } from 'common/js/music-list'
import { playlistMixin } from 'common/js/mixin'
export default {
  name: 'Rank',
  mixins: [playlistMixin],
  components: {
    BaseHeader,
    MusicList,
    Scroll,
    Loading
  },
  data () {
    return {
      showLoading: true,
      officialIndex: 3,
      globalIndex: 23,
      officialMusicList: [],
      globalMusicList: []
    }
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '1.4rem' : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    showMusicDetail (id) {
      this.$router.push(`/music-list-detail/${id}`)
    },
    getRankList () {
      // officialMusicList
      for (let i = 0; i <= this.officialIndex; i++) {
        getRankList(i).then(res => {
          if (res && res.playlist) {
            this.officialMusicList.push(createMusicList(res.playlist))
          }
        })
      }
      // globalMusicList
      for (let j = this.officialIndex + 1; j <= this.globalIndex; j++) {
        getRankList(j).then(res => {
          if (res && res.playlist) {
            this.globalMusicList.push(createMusicList(res.playlist))
            this.showLoading = false
          }
        })
      }
    }
  },
  mounted () {
    this.getRankList()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  @import '~common/style/mixin.styl'
  .container
    position: absolute
    top: $header-height
    bottom: 0
    left: 0
    right: 0
    .title
      font-size: $font-size-medium
      padding: .4rem 0 .4rem .2rem
    .official-list
      .item
        display: flex
        align-items: center
        height: 3rem
        padding: .1rem 0
        border-bottom: 1px solid $border-color
        .img-wrapper
          width: 30%
          margin-left: .2rem
          .img
            width: 100%
        .top3-list
          width: 6.4rem
          margin-left: .4rem
          .list-item
            padding: .2rem 0
            letter-spacing: 2px
            list-style-type: decimal
            list-style-position: inside
            no-wrap()
</style>
