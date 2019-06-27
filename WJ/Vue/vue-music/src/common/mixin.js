import {mapGetters,mapMutations,mapActions } from 'vuex'

export  const searchMixin = {
  data() {
    return {
      query:'',
      refreshDelay:120
    }
  },
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods: {
    ...mapActions(['addSearchHistory','selectPlaySong']),
    onQueryChange(query){
      this.query = query.trim()
    },
    blurInput(){
      this.$refs.searchBox.blur()
    },
    addQuery(query){
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch(song){
      console.log(song)
      this.selectPlaySong(song)
      this.addSearchHistory(this.query)
    },
  }
}