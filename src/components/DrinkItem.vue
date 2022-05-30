<template>
    <div class="drink-item eat-item menu-list-item ">
        <!-- <img  class="eat-img" 
                :src="item.productImage" 
                :alt="item.alt"> -->
        <div class="eat-img drink-img">
            <div class="eat-wrapper">
                <h6 v-if="!openInfo" class="eat-product drink-product">
                    {{item.product}}
                    
                </h6>
                <div v-if="openInfo" class="eat-product_structure">
                    {{item.structure}}
                </div>
                    
            </div>
            <div v-if="!openInfo" class="eat-product-wrapper drink-product-wrapper">

                <div class="eat-type" v-for="(type, typeIndex) in item.types" :key="type.id">
                    {{type.type}}
                        <div class="eat-type-price" v-if="type.howmany <= 0">
                            {{type.price + 'p.'}}
                            <i @click="addToBasket(item, type, typeIndex)" class="eat-add-to-basket bi bi-cart-plus">

                            </i>
                        </div>
                        <div v-if=" type.howmany > 0" class="eat-add">
                            <i @click="removeToBasket(item, type, typeIndex)" class="bi bi-dash">
                            </i>
                                {{type.howmany}}
                            <i @click="addToBasket(item, type, typeIndex)"  class="bi bi-plus">
                            </i>
                        </div>
                </div>
            </div>

                <i v-if="!openInfo" @click="openInfo = !openInfo"
                    class="eat-info bi bi-info-circle">
                </i>
                <i v-if="openInfo" @click="openInfo = !openInfo"
                    class="eat-info bi bi-x-circle">
                </i>
                <div v-if="item.icon" class="eat-img-back">
                    <img :src="item.icon" alt="icon">
                </div>

        </div>
        <div class="divider"></div>
    </div>
</template>


<script>
export default {
    name: 'drink-item',
    props: {
        item:{
            type: Object
        }
    },
    data() {
        return{
            openInfo: false
        }
    },
    methods:{
        addToBasket(item, type, typeIndex){
            (type.howmany === 10) ? false :
            type.howmany = type.howmany + 1
            this.$emit('add-to-drink-basket', item, type, typeIndex)
        },
        removeToBasket(item, type, typeIndex){
            type.howmany = type.howmany - 1
            this.$emit('remove-to-drink-basket', item, type, typeIndex)
        }
    }
}
</script>