<template>
    <div class="container">
        <!-- <div class="drink-placeholder">
            Товаров пока нет)
        </div> -->
        <!-- {{sumDrinkBasket}} не сохраняет
        {{drinkBasket}} -->
        <div class="eat-list menu-list">
            <drink-item  v-for="item in drinkList" :key="item.id"
                :item="item"
                
                @add-to-drink-basket='addToDrinkBasket'
                @remove-to-drink-basket="removToDrinkBasket">

            </drink-item>
            
        </div>
    </div>
</template>

<script>
import DrinkItem from '@/components/DrinkItem.vue'
export default {
    
    name:'page-drinks',
    components:{
        DrinkItem
    },
    data() {
        return{
            sumDrinkBasket: null,
            drinkBasket:[],
            drinkList:[
                {
                    "id": 0,
                    "product": 'Coca-Cola',
                    "icon": require("@/assets/images/icons_drink/coke.png"),
                    "structure": 'himoza',
                    types:[
                        {
                            "typeId": 0,
                            "type": 'В бутылке',
                            "price": 109,
                            "howmany": 0
                        },
                        {
                            "typeId": 1,
                            "type": 'В стакане',
                            "price": 102,
                            "howmany": 0
                        }
                    ]
                },
                {
                    "id": 1,
                    "product": 'Pepsi',
                    "icon": require("@/assets/images/icons_drink/open-pepsi-can.png"),
                    "structure": 'himoza vkusnee',
                    types:[
                        {
                            "typeId": 2,
                            "type": 'В бутылке',
                            "price": 109,
                            "howmany": 0
                        },
                        {
                            "typeId": 3,
                            "type": 'В стакане',
                            "price": 102,
                            "howmany": 0
                        }
                    ]
                },
                {
                    "id": 2,
                    "product": 'Lipton',
                    "icon": require("@/assets/images/icons_drink/tea.png"),
                    "structure": 'chqi s himozoi',
                    types:[
                        {
                            "typeId": 4,
                            "type": 'В бутылке',
                            "price": 109,
                            "howmany": 0
                        },
                        {
                            "typeId": 5,
                            "type": 'В стакане',
                            "price": 102,
                            "howmany": 0
                        }
                    ]
                },
                {
                    "id": 3,
                    "product": 'Rich',
                    "icon": require("@/assets/images/icons_drink/juice.png"),
                    "structure": 'voda',
                    types:[
                        {
                            "typeId": 6,
                            "type": 'В бутылке',
                            "price": 89,
                            "howmany": 0
                        },
                        {
                            "typeId": 7,
                            "type": 'В стакане',
                            "price": 85,
                            "howmany": 0
                        }
                    ]
                },
                {
                    "id": 4,
                    "product": 'Wather',
                    "icon": require("@/assets/images/icons_drink/plastic-bottle.png"),
                    "structure": 'dova',
                    types:[
                        {
                            "typeId": 8,
                            "type": 'В бутылке',
                            "price": 50,
                            "howmany": 0
                        },
                        {
                            "typeId": 9,
                            "type": 'В стакане',
                            "price": 60,
                            "howmany": 0
                        }
                    ]
                },
            ]
        }
    },
    methods:{
        addToDrinkBasket(item, type, typeIndex){
            typeIndex 
            type.product = item.product
            type.id = item.id
            if(type.howmany == true) {
                this.drinkBasket.push(type)
            } else {
                this.drinkBasket.howmany = this.drinkBasket.howmany + 1 
            }

            this.reduceSum()
        },
        removToDrinkBasket(item, type, typeIndex){
            typeIndex            
            if(type.howmany == 0){
                this.drinkBasket = this.drinkBasket.filter(i =>i.typeId !== type.typeId )
            } else this.drinkBasket.howmany = this.drinkBasket.howmany - 1

            this.reduceSum()
        },
        reduceSum(){ ///////////сумма корзины
            this.sumDrinkBasket = this.drinkBasket.map(item =>  item.price * item.howmany)
                .reduce((price, sum) => sum + price, 0) 

            this.$emit('reduceDrinkSum', this.sumDrinkBasket, this.drinkBasket)

        },
    },
    mounted(){
        
        if(sessionStorage.drinkBasket){
            this.drinkBasket = JSON.parse(sessionStorage.drinkBasket)
        }
    },
    watch:{
        drinkBasket:{
            handler(newVal){
                sessionStorage.drinkBasket = JSON.stringify(newVal)
            },
            deep: true
        },

    },
}
</script>