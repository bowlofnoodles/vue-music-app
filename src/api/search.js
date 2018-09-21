import axios from 'axios'
import { URL } from './config'

export function getSearchHot () {
  const url = `${URL}/search/hot`
  return axios.get(url).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}

export function getSearchSugg (params) {
  const url = `${URL}/search/suggest`
  return axios.get(url, {
    params
  })
}

export function getSearchByKey (params) {
  const url = `${URL}/search`
  return axios.get(url, {
    params
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
