import { checkSong, getLyric } from 'api/song'
export default class Song {
  constructor ({id, name, alia, singers, album, picUrl, duration, url}) {
    this.id = id
    this.name = name
    this.alia = alia
    this.singers = singers
    this.album = album
    this.picUrl = picUrl
    this.duration = duration
    this.url = url
  }
  checkSong () {
    checkSong(this.id).then(res => {
      return res
    })
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then(res => {
        if (res && res.lrc) {
          this.lyric = res.lrc.lyric
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong (songData) {
  return new Song({
    id: songData.id,
    name: songData.name,
    alia: songData.alias ? songData.alias[0] : songData.alia[0],
    singers: _concatSingers(songData.ar || songData.artists),
    album: songData.al ? songData.al.name : songData.album.name,
    picUrl: songData.al ? songData.al.picUrl : songData.album.picUrl,
    duration: songData.dt || songData.duration,
    url: `http://music.163.com/song/media/outer/url?id=${songData.id}.mp3`
  })
}

function _concatSingers (singers) {
  let ret = []
  if (!singers) {
    return ''
  }
  singers.forEach(item => {
    ret.push(item.name)
  })
  return ret.join('/')
}
