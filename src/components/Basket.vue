<template>
    <div class="containe">
        <div v-if="drinkBasket.length === 0 && basket.length === 0" class="basket-placeholder">
            Добавьте что-нибудь в корзину
            <br>
            <img class="basket-img" :src="basketImg" alt="">
        </div>
        <div class="basket">
            <h5 v-if="drinkBasket.length !== 0 || basket.length !== 0">Ваш заказ:</h5>
            <!-- basket eat -->
            <div v-for="(item, index) in basket" :key="item.id" class="basket-wrapper">
                <div class="basket-item" :class="{openAdd: openAdd === index}">
                    <h6>{{item.product}}: <br> <p><span>{{item.type}}</span></p></h6>
                    <div class="basket-howmany">
                        <i v-if="item.howmany > 0" @click="removeToBasket(item, typeIndex)" class="bi bi-dash">
                        </i>
                        <i v-else class="bi bi-trash3" @click="removeToBasket(item, typeIndex)"></i>
                            {{item.howmany}}
                        <i @click="addToBasket(item, typeIndex)"  class="bi bi-plus">
                        </i>
                        <div v-if="openAdd === false || openAdd === index"     
                            @click="openAddMenu(index)" 
                            class="basket-item_add">
                                Дополнения
                        </div>
                    </div>
                <div v-if="openAdd === index" class="basket-addMenu" :class="{showed: openAdd === index}">
                    <div v-for="(menu, indexMenu) in item.addMenu" :key="menu.id" class="basket-addMenu_item">
                        {{menu.name}}
                        <div style="display:flex; column-gap: 6px">+{{menu.price}} руб.
                            <!-- <input type="checkbox" :id="menu.add" :value="menu.add" v-model="item.checkedAdd"> -->
                            <div class="form-check form-switch">
                                <input @change="addPush(item,index, menu, indexMenu)" class="form-check-input" type="checkbox" role="switch" :id="menu.add" :value="menu.price"
                                  v-model="item.checkedAdd" :disabled="item.howmany === 0">
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>



<!-- basket drink -->
            <div v-for="item in drinkBasket" :key="item.id" class="basket-wrapper">
                <div class="basket-item basket-item_drink" >
                    <h6>{{item.product}}: <br> <p><span>{{item.type}}</span></p></h6>
                    <div class="basket-howmany">
                        <i v-if="item.howmany > 0" @click="removeToDrinkBasket(item, typeIndex)" class="bi bi-dash">
                        </i>
                        <i v-else class="bi bi-trash3" @click="removeToDrinkBasket(item, typeIndex)"></i>
                            {{item.howmany}}
                        <i @click="addToBasket(item, typeIndex)"  class="bi bi-plus">
                        </i>
                        
                    </div>
                </div>
            </div>




<!-- ///////descp -->
            <div class="basket-desc"  v-if="drinkBasket.length !== 0 || basket.length !== 0">
                
                <form @submit.prevent='onSubmit' class="basket-form">
                    <div v-if="basketDescrOpen" class="basket-form-btn">
                        <button type="submit"><i class="bi bi-check2"></i>
                        </button>

                        <div @click="basketDescrOpen = !basketDescrOpen">
                            <i class="bi bi-x-lg"></i>
                        </div>
                        
                    </div>
                    <input v-if="basketDescrOpen" v-model="basketDescr" type="text" >
                    <label for="basketDescr">
                        Комментарий к заказу: <span>{{basketDescription}}</span> 
                        <i @click="basketDescrOpen = !basketDescrOpen" 
                            v-if="!basketDescrOpen"
                            class="bi bi-pencil-square">
                        </i>
                    </label>
                    
                    <select v-model="selectedAddress" placeholder="Выберите адрес">
                        <option disabled value="">Выберите один из вариантов</option>
                        <option>Комендантский просп., 12, корп. 1</option>
                        <option>Проспект Наставников д. 45, к. 1</option>
                    </select>
                    <div class="basket-desc_address" :class="{addressCoise: addressCoise}">Выберите адрес:</div>
                </form>
                
            </div>
            
        </div>
        

        <footer-buttons>
            <div @click="backToHome" v-if="openMenuItem !== false && !sideMenu"  class="btn btn-success">
                <i class="bi bi-caret-left"></i>
            </div>
            <button @click="goToPay" type="button" class="btn btn-primary">
                    Продолжить
            </button>
        </footer-buttons>
    </div>
</template>

<script>

import FooterButtons from '../components/FooterButtons.vue'

export default {
    name: 'page-basket',
    props:{
        basket:{
            require: true
        },
        basketDescription:{
            type: String,
            require: false
        },
        drinkBasket:{
            require: true
        }
        
    },
    components:{
        FooterButtons  
    },
    data() {
        return{
            basketDescr: 'нет',
            basketDescrOpen: false,
            basketImg: require("@/assets/images/shopping-cart.png"),
            selectedAddress: null,
            openAdd: false,
            addressCoise: false
        }
    },
    methods: {
        addToBasket(item, type, typeIndex){
            typeIndex
            if(item.howmany === 10){
                return false
                } 
                else  item.howmany = item.howmany + 1 

            // this.reduceSum()

        },
        removeToBasket(item, type, typeIndex){
            typeIndex
            if(item.howmany < 1){
                return this.$emit('remove-this-cart', item)
                } 
                else  item.howmany = item.howmany - 1 
            // this.reduceSum()

        },
        removeToDrinkBasket(item, type, typeIndex){
            typeIndex
            if(item.howmany < 1){
                return this.$emit('remove-this-drink-cart', item)
                } 
                else  item.howmany = item.howmany - 1 
            // this.reduceSum()
        },
        
        // reduceSum(){ ///////////сумма корзины
        //         this.sumBasket = this.basket.map(item =>  item.price * item.howmany)
        //             .reduce((price, sum) => sum + price, 0) 
        // },
        onSubmit(){
            this.$emit('basket-descr-submit', this.basketDescr)
            this.basketDescrOpen = false
        },
        openAddMenu(index){
            if(this.openAdd === false){
                this.openAdd = index
            } else this.openAdd = false
        },
        addPush(item, index,menu,indexMenu){
            // console.log(213)
            this.$emit('push-to-name', item, index,menu, indexMenu)
        },
        goToPay(){
            (!this.selectedAddress) ? this.Coise()   : this.$emit('go-to-pay')
        },
        Coise(){
            this.addressCoise = true
            setTimeout(()=>{
                this.addressCoise = false
            }, 2000)
        }
    },
    
    watch:{
        sumBasket:{
            handler(){

            }
        },
        selectedAddress:{
            handler(){
                this.$emit('choise-address', this.selectedAddress)
            }
        },
    },
   
}
</script>