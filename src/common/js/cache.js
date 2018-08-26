import { searchHistoryLen } from './config'
import { findIndex } from './util'
const historyKey = '__history__'
let _id = 1
export function saveSearch (searchKey) {
  // 下标越小 历史记录越新
  let histories = localStorage[historyKey] ? JSON.parse(localStorage[historyKey]) : []
  let index = findIndex(histories, 'key', searchKey)
  if (index !== -1) {
    histories = histories.concat(histories.splice(index, 1))
  } else {
    if (histories.length < searchHistoryLen) {
      histories.push({
        id: '0' + _id++,
        key: searchKey
      })
    } else {
      histories.push({
        id: '0' + _id++,
        key: searchKey
      })
      histories.shift()
    }
  }
  localStorage.setItem(historyKey, JSON.stringify(histories))
}

export function getSearch () {
  return JSON.parse(localStorage[historyKey])
}

export function deleteSearch (id) {
  if (!id) return
  console.log(id)
  let histories = localStorage[historyKey] ? JSON.parse(localStorage[historyKey]) : []
  histories && histories.splice(findIndex(histories, 'id', id), 1)
}
