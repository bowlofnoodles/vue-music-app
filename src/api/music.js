import axios from 'axios'
import { URL } from './config'

export function getMusicUrl (id) {
  const url = `${URL}/music/url`
  return axios.get(url, {
    params: {
      id
    }
  })
}
