<template>
  <div>
    <h2>news page</h2>
    <p>newsID : {{$route.params.newsId}}</p>
    <ul>
      <li><nuxt-link to="/news/132">123</nuxt-link></li>
      <li><nuxt-link :to="{name:'news-id',params:{id:678,title:'news1'}}">678</nuxt-link></li>
      <li><nuxt-link to="/news/45336">456</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  transition: 'test'
}
</script>