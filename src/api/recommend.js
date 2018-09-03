import axios from 'axios'
import { URL } from './config'

export function getBanner () {
  const url = `${URL}/banner`
  return axios.get(url)
}

export function getRecMusicList () {
  const url = `${URL}/personalized`
  return axios.get(url)
}

export function getNewMusic () {
  const url = `${URL}/personalized/newsong`
  return axios.get(url)
}
