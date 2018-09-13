import axios from 'axios'
import { URL } from './config'

export function getSongUrl (id) {
  const url = `${URL}/music/url`
  return axios.get(url, {
    params: {
      id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function checkSong (id) {
  const url = `${URL}/check/music`
  return axios.get(url, {
    params: {
      id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getLyric (id) {
  const url = `${URL}/lyric`
  return axios.get(url, {
    params: {
      id
    }
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
