/**
 * 全局工具函数
 */
export function findIndex (arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i
    }
  }
  return -1
}

export function convertCount (num) {
  if (num + 0 < 100000) {
    return Math.floor(num)
  } else {
    return Math.floor((num / 10000)) + '万'
  }
}
