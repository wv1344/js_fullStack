import api from '../../api'
import * as types from '../types'
import {findIndex} from '@/common/util'


const state = {
  playList:[],
  currentIndex:-1,
  favoriteList:[],
  playHistory:[],
  playing:false
}

const mutations = {
  [types.SET_PLAYLIST] (state,playlist){
    state.playList = playlist
  },
  [types.SET_CURRENT_INDEX] (state,index){
    state.currentIndex = index
  },
  [types.SET_PLAYING] (state,status){
    state.playing = status
  },
  [types.SAVE_PLAYHISTORY] (state,playload){
    state.playHistory = playload
  },
  [types.SAVE_FAVORITELIST] (state,playload){
    state.favoriteList = playload
  }
}

const actions = {
  selectPlaySong({commit,state},song){
    let playlist = state.playList.slice()
    let currentIndex = state.currentIndex
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist,song)
    // 如果已经包含则这首歌
    if(fpIndex > -1){
      currentIndex = fpIndex
    }else{
      playlist = [...playlist,song]
      currentIndex = playlist.length -1
    }
    commit('SET_PLAYLIST',playlist)
    commit('SET_CURRENT_INDEX',currentIndex)
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}