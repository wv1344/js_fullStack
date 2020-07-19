import { mapGetters, mapMutations, mapActions } from 'vuex';

export const searchMixin = {
  data () {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    onQueryChange (query) {
      // console.log(query)
      this.query = query.trim()
    },
    blurInput () {
      this.$refs.searchBox.blur()
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch (song) {
      console.log(song)
      this.selectPlaySong(song)
      this.saveSearchHistory(this.query)
    },
    ...mapActions([
      'saveSearchHistory',
      'selectPlaySong'
    ])
  }
}

export const playMixin = {
  methods:{
    ...mapActions([
      'saveFavoriteList'
    ]),
    ...mapMutations({
      setPlaylist:'SET_PLAYLIST',
      setCurrentIndex:'SET_CURRENT_INDEX',
      setPlaying:'SET_PLAYING'
    }),
    toggleFavorite(song){
      if(this.isFavorite(song)){
        this.deleteFavoriteList(song)
      }else{
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song){
      if(this.isFavorite){
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song){
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    deleteFavoriteList(){

    },
    saveFavoriteList(){

    }
  },
  computed: {
    ...mapGetters(['playList','currentSong','currentIndex','favoriteList']),
    favoriteIcon(){
      return this.getFavoriteIcon(this.currentSong)
    }
  }
}