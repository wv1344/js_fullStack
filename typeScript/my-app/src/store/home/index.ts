import {State} from '@/store/interface'
import {Commit} from 'vuex'
import {getMovieList} from '@/api/movie'

const getters = {
  
}

// const a:string = 1;
// let b:string = '1';

const state: State = {
  movieList:[
    {
      name:'霸王别姬',
      title:'lskd',
      id:'123456'
    },
  ]
}

const mutations= {
  
}

const actions =  {
  // api 前后端分离点
  // commit mutations
  movieList:(context:{commit:Commit},cate:String) => {
    const res = await getMovieList(cate)
      .then((response) => response)
    return res
  }
}

export default{
  state,
  getters,
  mutations,
  actions
}