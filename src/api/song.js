import axios from 'axios'
import { URL } from './config'
import { createSong } from 'common/js/song'

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

export function getSongsDetail (idArr) {
  const url = `${URL}/song/detail`
  let promises = []
  if (idArr.length) {
    idArr.forEach(item => {
      promises.push(axios.get(url, {
        params: {
          ids: item
        }
      }))
    })
    return Promise.all(promises).then(res => {
      let ret = null
      if (res) {
        ret = []
        res.forEach(item => {
          ret.push(createSong(item.data.songs[0]))
        })
      }
      return Promise.resolve(ret)
    })
  } else {
    return Promise.resolve([])
  }
}
