import * as types from './mutation-types'
const mutations = {
  [types.SET_SHOW_RESULT] (state) {
    console.log('响应了')
    state.searchKey = 'uie'
  }
}
export default mutations
