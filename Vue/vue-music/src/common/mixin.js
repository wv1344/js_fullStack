import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import api from '@/api/index.js'

export const searchMixin = {
  data() {
    return {
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods: {
    ...mapActions(['addSearchHistory', 'selectPlaySong', 'addPlayList']),
    onQueryChange(query) {
      this.query = query.trim()
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch(song) {
      console.log(this.query)
      this.addSearchHistory(this.query)
      this.selectPlaySong(song)
    },
    savePlayList(playlist) {
      this.addPlayList(playlist)
    }
  }
}

export const playMixin = {
  methods: {
    ...mapActions([
      'saveFavoriteList'
    ]),
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setCurrentIndex: 'SET-CURRENT_INDEX',
      setPlaying: 'SET_PLAYING'
    }),
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song)
      } else {
        this.saveFavoriteList(song)
      }
    },
    getFavoriteIcon(song) {
      if (this.isFavorite) {
        return 'icon-favorite'
      }
      return 'icon-not-favorite'
    },
    isFavorite(song) {
      const index = this.FavoriteList.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    },
    deleteFavoriteList() {

    },
    saveFavoriteList() {

    },
  },
  computed: {
    ...mapGetters(['playList', 'currentSong', 'currentIndex', 'favoriteList']),
    favoriteIcon() {
      return this.getFavoriteIcon(this.currentSong)
    }
  }
}
