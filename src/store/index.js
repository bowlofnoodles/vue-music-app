import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchKey: '',
    showSearchRes: false,
    searchHistory: []
  },
  mutations: {
    changeSearchKey (state, searchKey) {
      state.searchKey = searchKey
    },
    changeShowRes (state) {
      state.showSearchRes = true
    },
    pushNewHisItem (state, value) {
      state.searchHistory.push(value)
    }
  }
})
