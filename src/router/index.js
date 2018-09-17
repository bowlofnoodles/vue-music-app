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
import SearchAlbums from 'pages/search/components/Albums'

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
      query: {
        initial: '',
        cate: ''
      },
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
          path: 'songs',
          name: 'SearchSongs',
          component: SearchSongs
        },
        {
          path: 'singers',
          name: 'SearchSingers',
          component: SearchSingers
        },
        {
          path: 'albums',
          name: 'SearchAlbums',
          component: SearchAlbums
        }
      ]
    }
  ]
})
