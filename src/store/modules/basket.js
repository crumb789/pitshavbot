export default{
    actions:{
        async fetchPosts(ctx, limit = 3){
            const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=' + limit)
            const posts = await res.json()
            
            ctx.commit('updatePosts', posts)
        }
    },
    mutations:{
        updatePosts(state,posts){
            state.posts = posts
        },
        createPost(state, newPost){
            state.posts.unshift(newPost)
        },
        addToBasketVuex(state, newItem){
            state.basket.push(newItem)
        },
        changepaid(state, newPaid ){
           if(newPaid === 0){
            state.toBePaid.newPaid = 0
           } else state.toBePaid = newPaid
        },
        changeBasket(state, newValue){
            state.basket.push(newValue)
        },
        removeCart(state, newValue){
            state.basket.push(newValue)
        }
    },
    state:{
        toBePaid: {
            newPaid: null
        },
        basket:[],
        paid: 100
    },
    getters:{
        validPosts(state){
            return state.posts.filter(p => {
                return p.title && p.body
            })
        },
        sumBasket(){
            return 1
        },
        allPosts(state){
            return state.posts
        },
        postsCount(state, getters){
            return getters.validPosts.length
        }
    },


}