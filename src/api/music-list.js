import { URL } from './config'
import axios from 'axios'

export function getHotMusicList (cat, limit, offset) {
  const url = `${URL}/top/playlist`
  return axios.get(url, {
    params: {
      cat,
      limit,
      offset
    }
  })
}

export function getCatList () {
  const url = `${URL}/playlist/catlist`
  return axios.get(url)
}

export function getMusicListDetail (id) {
  const url = `${URL}/playlist/detail`
  return axios.get(url, {
    params: {
      id
    }
  })
}
