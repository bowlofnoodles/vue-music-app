import { playMode } from 'common/js/config'
const state = {
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showSearchRes: !!sessionStorage.show_search_res
}
export default state
