<template>
<div>
  <base-header title="评论" @back="back">({{total}})</base-header>
  <scroll class="container" :pullup="true" @scrollToEnd="getComment">
    <div class="wrapper">
      <div class="target">
        <div class="img-wrapper">
          <img v-lazy="target.picUrl" class="img"/>
        </div>
        <div class="target-desc">
          <div class="song-name">{{target.name}}</div>
          <div class="singer" v-show="this.type === 'music'">{{target.singer}}</div>
        </div>
      </div>
      <div class="hot-comment" v-show="this.hotComments.length">
        <div class="title">精彩评论</div>
        <div class="list">
          <div class="item" v-for="item of hotComments" :key="item.commentId">
            <div class="img-wrapper">
              <img v-lazy="item.user.avatarUrl" class="img"/>
            </div>
            <div class="content">
              <div class="desc-wrapper">
                <div class="desc">
                  <div class="nickname">{{item.user.nickname}}</div>
                  <div class="time">{{_formatTime(item.time)}}</div>
                </div>
              </div>
              <div class="comment">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="title">最新评论</div>
       <div class="list">
        <div class="item" v-for="item of comments" :key="item.commentId">
          <div class="img-wrapper">
            <img v-lazy="item.user.avatarUrl" class="img"/>
          </div>
          <div class="content">
            <div class="desc-wrapper">
              <div class="desc">
                <div class="nickname">{{item.user.nickname}}</div>
                <div class="time">{{_formatTime(item.time)}}</div>
              </div>
            </div>
            <div class="comment">
              {{item.content}}
              <div class="reply" v-show="item.beReplied.length">
                <a href="javascript:;" class="user">@{{item.beReplied[0] && item.beReplied[0].user && item.beReplied[0].user.nickname}}:</a>
                {{item.beReplied[0] && item.beReplied[0].content}}
              </div>
            </div>
          </div>
        </div>
        <loading v-show="showPullUpLoading"></loading>
      </div>
    </div>
  </scroll>
</div>
</template>

<script>
import BaseHeader from 'base/header/Header'
import { getComment } from 'api/comment'
import { mapGetters } from 'vuex'
import Loading from 'base/loading/Loading'
import Scroll from 'base/scroll/Scroll'
export default {
  name: 'Comment',
  components: {
    BaseHeader,
    Loading,
    Scroll
  },
  data () {
    return {
      total: 0,
      hotComments: [],
      comments: [],
      more: true,
      moreHot: true,
      showPullUpLoading: true,
      limit: 20,
      offset: 0
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    type () {
      return this.$route.params.type
    },
    target () {
      return this.$route.query
    },
    ...mapGetters(['playlist'])
  },
  methods: {
    back () {
      this.$router.back()
      if (this.playlist.length > 0) {
        document.querySelector('.player').style.display = 'block'
      }
    },
    getComment (flag) {
      if (!this.more) {
        this.showPullUpLoading = false
        return
      }
      if (flag) {
        this.offset = 0
        this.comments = []
      } else {
        this.offset += 20
      }
      getComment({
        type: this.type,
        id: this.id,
        limit: this.limit,
        offset: this.offset
      }).then(res => {
        this.total = res.total
        if (flag) this.hotComments = res.hotComments
        this.comments = this.comments.concat(res.comments)
        this.moreHot = res.moreHot
        this.more = res.more
      })
    },
    _formatTime (stamp) {
      let date = new Date(stamp)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${this._padNum(date.getHours())}:${this._padNum(date.getMinutes())}`
    },
    _padNum (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
  },
  mounted () {
    document.querySelector('.player').style.display = 'none'
    this.getComment(true)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/style/variable.styl'
  >>> .header
    z-index: 103
  .container
    position: absolute
    left: 0
    right: 0
    top: $header-height
    bottom: 0
    z-index: 102
    .wrapper
      background: $theme-color
    .target
      display: flex
      align-items: center
      box-sizing: border-box
      height: 2.4rem
      padding: .2rem
      border-bottom: 1px solid $border-color
      .img-wrapper
        width: 20%
        padding-right: .2rem
        .img
          width: 100%
      .target-desc
        flex: 1
        .song-name
          padding-bottom: .2rem
          font-size: $font-size-medium
        .singer
          color: $font-color-l
    .title
      padding-left: .2rem
      line-height: 1rem
    .list
      .item
        display: flex
        width: 100%
        margin-top: .2rem
        border-bottom: 1px solid $border-color
        .img-wrapper
          box-sizing: border-box
          width: 10%
          margin: 0 .2rem
          .img
            width: 100%
            border-radius: 50%
        .content
          flex: 1
          .desc-wrapper
            display: table
            height: 1rem
            .desc
              display: table-cell
              vertical-align: middle
              .nickname
                font-size: $font-size-small-s
                color: #555
                padding-bottom: .1rem
              .time
                font-size: $font-size-small-s
                color: $font-color-l
          .comment
            margin: .2rem .2rem .2rem 0
            line-height: .56rem
            .reply
              margin-top: .2rem
              border: 1px solid $border-color
              padding: .2rem
              .user
                padding-right: .1rem
                color: #4169E1
</style>
