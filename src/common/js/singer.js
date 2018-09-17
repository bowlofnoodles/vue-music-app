import { getSingerIntro } from 'api/singer'
import { createSong } from './song'
export default class Singer {
  constructor ({id, name, picUrl, img1v1Url, briefDesc, hotSongs}) {
    this.id = id
    this.name = name
    this.picUrl = picUrl
    this.img1v1Url = img1v1Url
    this.briefDesc = briefDesc
    this.hotSongs = hotSongs
  }
  getIntro () {
    if (this.introduction) {
      return Promise.resolve(this.introduction)
    }
    return new Promise((resolve, reject) => {
      getSingerIntro(this.id).then(res => {
        if (res && res.introduction) {
          this.introduction = res.introduction
          resolve(this.introduction)
        }
      })
    })
  }
}

export function createSinger (singerData) {
  return new Singer({
    id: singerData.id,
    name: singerData.name,
    picUrl: singerData.picUrl,
    briefDesc: singerData.briefDesc,
    hotSongs: _formatSongs(singerData.hotSongs)
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
