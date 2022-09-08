<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link>  -->
    <!-- <PostForm>

    </PostForm>
    <h1>{{postsCount}}</h1>
    <div class="post" v-for="post in validPosts" :key="post.id">
      <h2>{{post.title}}</h2>
      <p>{{post.body}}</p> -->
    <!-- </div> -->
  </div>
  <router-view/>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'
// import PostForm from '@/components/PostForm.vue'

export default {
  components:{
    // PostForm
  },
  computed: 
    mapGetters(['validPosts', 'postsCount']), 
    
  methods: mapActions(['fetchPosts']),
  async mounted(){
    // this.$store.dispatch('fetchPosts')
    this.fetchPosts()

    if(sessionStorage.sumBasket){
            this.sumBasket = JSON.parse(sessionStorage.sumBasket)
        }
  },
  
  watch:{
      sumBasket:{
          handler(newSum){
              sessionStorage.sumBasket = JSON.stringify(newSum)
          },
          deep: true
      },
  },

  
}
</script>

<style lang="scss">

a{
  color: var(--tg-theme-link-color);
}
.post{
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

</style>
