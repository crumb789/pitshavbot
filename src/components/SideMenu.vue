<template>
    <div class="side-menu">
        <hr style="width:80%">
        <div v-for="item in sideMenu" :key="item.id"
            class="side-menu-item">
                <div @click="goToSide(item)" >
                    {{item.page}}
                </div>
        </div>
        <hr style="width:80%">
        <div class="icons">
            <div class="icons-item">
                <a href="https://t.me/crumb789">
                    <img src="../assets/images/icons/crumb-logo1.png" alt="dev" title="developer">
                </a>
                
            </div>            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            sideMenu:[
                {
                    'id': 0,
                    'page': 'О нас',
                    'link': 'about-us'

                },
                {
                    'id': 1,
                    'page': 'Где нас найти',
                    'link': 'place'
                }
            ]
        }
    },
    methods:{
        goToSide(item){
            this.$emit('go-to-side-menu', item)
        }
    }
}
</script>

