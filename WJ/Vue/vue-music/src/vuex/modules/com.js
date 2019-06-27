import api from '../../api'
import * as types from '../types'

const state = {
  showSidebar: false,
  fullScreen:false,
  searchHistory:['123','456']
}

const mutations = {
  [types.COM_SHOW_SIDE_BAR] (state, status) {
    state.showSidebar = status
  },
  [types.SET_FULL_SCREEN] (state,status) {
    state.fullScreen = status
  },
  [types.ADD_SEARCH_HISTORY] (state) {
    state.searchHistory = state
  }
}

const actions = {
  setShowSidebar ({commit}, status) {
    commit(types.COM_SHOW_SIDE_BAR, status)
  },
  selectPlaySong({commit},status){
    // let playlist = state.playlist.slice()
    commit(types.SET_FULL_SCREEN,status)
  },
  addSearchHistory({commit,state},query){
    let searchHistory = [query,...state.searchHistory.slice()]
    searchHistory = [...new Set(searchHistory)]
    commit(types.ADD_SEARCH_HISTORY,searchHistory)
  }
}

const getters = {
  showSidebar: state => state.showSidebar,
  fullScreen: state => state.fullScreen,
  searchHistory: state => state.searchHistory
}

export default {
  state,
  mutations,
  actions,
  getters
}
