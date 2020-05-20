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
  [types.SAVE_PLAY_HISTORY] (state,playload){
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
    console.log(fpIndex)

    // 如果已经包含则这首歌
    if(fpIndex > -1){
      currentIndex = fpIndex
    }else{
      playlist = [...playlist,song]
      currentIndex = playlist.length -1
    }
    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    commit(types.SET_PLAYING,true)
  },
  // 加入播放列表
  addPlayList({commit,state},song){
    let playlist = [...state.playList.slice(),...song]
    if(playlist.length === 1){
      let currentIndex = state.currentIndex
      currentIndex++ 
      commit(types.SET_CURRENT_INDEX,currentIndex)
      commit(types.SET_PLAYING,true)
    }
    commit(types.SET_PLAYLIST,playlist)
  },
  // 保存播放历史
  savePlayhistory({commit,state},song){
    let playHistory = state.playHistory.slice()
    playHistory = [...playHistory,...song]
    commit(types.SAVE_PLAY_HISTORY,playHistory)
  }
}

const getters = {
  playing: state => state.playing,
  playList: state => state.playList,
  currentIndex: state => state.currentIndex,
  currentSong: state => {return state.playList[state.currentIndex] || {}},
  favoriteList: state => state.favoriteList,
  playHistory: state => state.playHistory
}

export default {
  state,
  mutations,
  actions,
  getters
}