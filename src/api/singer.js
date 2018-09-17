import { URL } from './config'
import axios from 'axios'

export function getHotSinger (limit, offset) {
  const url = `${URL}/top/artists`
  return axios.get(url, {
    params: {
      offset,
      limit
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function getSinger (id) {
  const url = `${URL}/artists`
  return axios.get(url, {
    params: {
      id
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function getSingerIntro (id) {
  const url = `${URL}/artist/desc`
  return axios.get(url, {
    params: {
      id
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function getSingerList (cat, initial, limit, offset) {
  const url = `${URL}/artist/list`
  return axios.get(url, {
    params: {
      cat,
      initial,
      limit,
      offset
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
