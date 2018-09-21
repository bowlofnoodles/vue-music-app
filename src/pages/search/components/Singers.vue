<template>
<div>
  <loading v-show="showLoading"></loading>
  <singer-list :list="singerList" :showLoading="showPullUpLoading"></singer-list>
  <p v-show="showNoRes" class="no-result">无搜索结果</p>
</div>
</template>

<script>
import SingerList from 'pages/singer/components/SingerList'
import { searchType } from 'common/js/config'
import { getSearchByKey } from 'api/search'
import Loading from 'base/loading/Loading'
export default {
  name: 'SearchSingers',
  components: {
    SingerList,
    Loading
  },
  data () {
    return {
      singerList: [],
      limit: 20,
      offset: 0,
      type: searchType.singer,
      showLoading: true,
      showNoRes: false,
      showPullUpLoading: true
    }
  },
  computed: {
    keywords () {
      return this.$route.query.keywords
    }
  },
  methods: {
    getSearchByKey () {
      getSearchByKey({
        limit: this.limit,
        type: this.type,
        offset: this.offset,
        keywords: this.keywords
      }).then(res => {
        this.showLoading = false
        if (res && res.result && res.result.artists) {
          this.singerList = res.result.artists
        } else {
          this.showNoRes = true
          this.showPullUpLoading = false
        }
      })
    }
  },
  mounted () {
    this.getSearchByKey()
  },
  watch: {
    keywords (newKey) {
      if (newKey) {
        this.showLoading = true
        this.showNoRes = false
        this.singerList = []
        this.getSearchByKey()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .no-result
      height: 1.4rem
      line-height: 1.4rem
      text-align: center
      letter-spacing: 2pxs
</style>
