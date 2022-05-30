<template>
    <div class="menu-list-item" :class="{menuMiniItem: openMenuItem !== false}">
        <a  class="menu-list-link">
            <img :class="{menuHide: openMenuItem !== false}" 
                :src="item.productImage" :alt="item.alt" />

            <div class="menu-list-item_product" 
                :class="{menuMiniProduct: openMenuItem !== false, menuActive:openMenuItem === item.id}">
            {{item.product}}
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name:'menu-item',
    props:{
        item:{
            type: Object
        },
        openMenuItem:{
            
        },
    },
    data() {
        return{

        }
    },
}
</script>
