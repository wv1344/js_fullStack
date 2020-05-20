import api from '../../api'
import * as types from '../types'

const state = {
  showSidebar: false,
  fullScreen:false,
  searchHistory:['123','456'],
  showPlayList:false
}

const mutations = {
  [types.COM_SHOW_SIDE_BAR] (state, status) {
    state.showSidebar = status
  },
  [types.SET_FULL_SCREEN] (state,status) {
    state.fullScreen = status
  },
  [types.ADD_SEARCH_HISTORY] (state,status) {
    state.searchHistory = status
  },
  [types.SET_SHOW_PLAY_LIST] (state,status){
    state.showPlayList = status
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
  },
  removeSearchHistory({commit,state},item){
    let searchHistory = [...state.searchHistory.slice()]
    const index = searchHistory.indexOf(item)
    searchHistory.splice(index,1)
    commit(types.ADD_SEARCH_HISTORY,searchHistory)
  },
  setShowPlayList({commit,state},status){
    commit(types.SET_SHOW_PLAY_LIST,status)
  }
}

const getters = {
  showSidebar: state => state.showSidebar,
  fullScreen: state => state.fullScreen,
  searchHistory: state => state.searchHistory,
  showPlayList: state => state.showPlayList
}

export default {
  state,
  mutations,
  actions,
  getters
}
