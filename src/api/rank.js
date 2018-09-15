import { URL } from 'api/config'
import axios from 'axios'
export function getRankList (idx) {
  const url = `${URL}/top/list`
  return axios.get(url, {
    params: {
      idx
    }
  }).then(res => {
    if (res && res.data) {
      return Promise.resolve(res.data)
    }
  })
}
