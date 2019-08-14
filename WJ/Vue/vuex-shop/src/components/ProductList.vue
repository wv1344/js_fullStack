<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{product.title}}
        <br/>
        <button @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  methods: mapActions('cart',[
    'addProductToCart'
  ]),
  computed: mapState({
    products:state => state.products.all
  }),
  created() {
    this.$store.dispatch('products/getAllProducts');
  },
}
</script>

<style>

</style>
