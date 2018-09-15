import { createSong } from './song'
import { convertCount } from 'common/js/util'
export default class MusicList {
  constructor ({id, name, desc, playCount = 0, picUrl, commentCount = 0, songListData = []}) {
    this.id = id
    this.name = name
    this.desc = desc
    this.playCount = playCount
    this.picUrl = picUrl
    this.commentCount = commentCount
    this.songListData = songListData
    this._init()
  }
  _init () {
    this._getBackgroundImage()
    this._getSongsCount()
  }
  _getSongsCount () {
    if (!this.songListData) {
      this.songsCount = 0
      return
    }
    this.songsCount = this.songListData.length
  }
  _getBackgroundImage () {
    this.backgroundImage = this.picUrl
  }
}

export function createMusicList (listData) {
  return new MusicList({
    id: listData.id,
    name: listData.name,
    desc: listData.description,
    playCount: _convertPlayCount(listData.playCount),
    picUrl: listData.coverImgUrl,
    commentCount: listData.commentCount,
    songListData: _formatSongs(listData.tracks)
  })
}

function _formatSongs (tracks) {
  if (tracks.length === 0) return null
  let ret = []
  tracks.forEach(item => {
    ret.push(createSong(item))
  })
  return ret
}

function _convertPlayCount (count) {
  return convertCount(count)
}
