import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/home/Home'
import Recommend from 'pages/recommend/Recommend'
import MusicVideo from 'pages/mv/MusicVideo'
import User from 'pages/user/User'
import Search from 'pages/search/Search'
import Rank from 'pages/rank/Rank'
import MusicList from 'pages/music-list/MusicList'
import MusicListDetail from 'pages/music-list-detail/MusicListDetail'
import FM from 'pages/fm/FM'
import Comment from 'pages/comment/Comment'
// Singer
import Singer from 'pages/singer/Singer'

import SingerCate from 'pages/singer-cate/SingerCate'
// SingerDetail
import SingerDetail from 'pages/singer-detail/SingerDetail'
import HotSong from 'pages/singer-detail/components/HotSong'
import Intro from 'pages/singer-detail/components/Intro'
// Search
import SearchSongs from 'pages/search/components/Songs'
import SearchSingers from 'pages/search/components/Singers'
import SearchMusicLists from 'pages/search/components/MusicLists'
import { searchType } from 'common/js/config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/recommend',
      component: Home,
      children: [
        {
          path: '/recommend',
          name: 'Recommend',
          component: Recommend
        },
        {
          path: '/mv',
          name: 'MusicVideo',
          component: MusicVideo
        },
        {
          path: '/user',
          name: 'User',
          component: User
        }
      ]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/music-list',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/music-list-detail/:id',
      name: 'MusicListDetail',
      component: MusicListDetail
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/singercate',
      name: 'SingerCate',
      component: SingerCate
    },
    {
      path: '/singer-detail/:id',
      name: 'SingerDetail',
      component: SingerDetail,
      redirect: '/singer-detail/:id/hotsongs',
      children: [
        {
          path: 'hotsongs',
          name: 'HotSong',
          component: HotSong
        },
        {
          path: 'intro',
          name: 'Intro',
          component: Intro
        }
      ]
    },
    {
      path: '/fm',
      name: 'FM',
      component: FM
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children: [
        {
          path: `${searchType.song}`,
          params: {
            type: searchType.song
          },
          name: 'SearchSongs',
          component: SearchSongs
        },
        {
          path: `${searchType.singer}`,
          name: 'SearchSingers',
          params: {
            type: searchType.song
          },
          component: SearchSingers
        },
        {
          path: `${searchType.musicList}`,
          name: 'SearchMusicLists',
          params: {
            type: searchType.song
          },
          component: SearchMusicLists
        }
      ]
    },
    {
      path: '/comment/:type/:id',
      name: Comment,
      component: Comment
    }
  ]
})
