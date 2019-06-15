  <template>
  <div>
    <h1>{{count}}</h1>
  </div>
</template>
  
  <script>
import { mapActions, mapMutations } from "vuex";
export default {
  // props:['count']
  data() {
    return {
      // count: this.$store.state.count
    };
  },
  methods: {
    ...mapActions(["increment"]),
    ...mapMutations(["increment"])
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>
  
  <style>
</style>
  