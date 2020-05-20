<template>
  <div>
    <h1>Welcome!</h1>
    <p><nuxt-link to="/product">Product page</nuxt-link></p>
    <p><nuxt-link :to="{name:'about',params:{newsId:3300}}">About</nuxt-link></p>
    <p><nuxt-link :to="{name:'news',params:{newsId:3300}}">News</nuxt-link></p>
    <p><nuxt-link :to="{name:'asynData'}">asynData</nuxt-link></p>
  </div>
</template>

<style>
.container {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  padding: 60px;
}
</style>