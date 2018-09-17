/**
 * @file 全局配置文件
 */

export const searchHistoryLen = 5
export const recMusicListLen = 6
export const playMode = {
  'sequence': 0,
  'loop': 1,
  'random': 2
}

export const searchType = {
  'song': 1,
  'album': 10,
  'singer': 100,
  'songList': 1000,
  'mv': 1004,
  'fm': 1009
}

// 华语男歌手 1001
// 华语女歌手 1002
// 华语组合/乐队 1003
// 欧美男歌手 2001
// 欧美女歌手 2002
// 欧美组合/乐队 2003
// 日本男歌手 6001
// 日本女歌手 6002
// 日本组合/乐队 6003
// 韩国男歌手 7001
// 韩国女歌手 7002
// 韩国组合/乐队 7003
// 其他男歌手 4001
// 其他女歌手 4002
// 其他组合/乐队 4003
export const singerCate = {
  'HuaMan': 1001,
  'HuaWoman': 1002,
  'HuaGroup': 1003,
  'UAMan': 2001,
  'UAWoman': 2002,
  'UAGroup': 2003,
  'JapanMan': 6001,
  'JapanWoman': 6002,
  'JapanGroup': 6003,
  'KoreanMan': 7001,
  'KoreanWoman': 7002,
  'KoreanGroup': 7003,
  'OtherMan': 4001,
  'OtherWoman': 4002,
  'OtherGroup': 4003
}
