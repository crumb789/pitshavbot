<template>
    <form @submit.prevent="submit">
        <input v-model="title" type="text">
        <input v-model="body" type="text">
        <button type="submit">create post</button>
        <hr>
    </form>
</template>

<script>
import {mapMutations} from 'vuex'


export default {
    data() {
        return{
            title: '',
            body: ''
        }
    },
    methods:{
        ...mapMutations(['createPost']),
        submit(){
            this.createPost({
                title : this.title,
                body: this.body,
                id: Date.now()
            })
            this.title = this.body = ''
        }
    }
}
</script>