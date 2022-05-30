<template>
    <div class="container">
        <div class="eat-list menu-list">
            <eat-item v-for="item in eatList.sort()" :key="item.id"
                :item="item"
                @add-to-basket="addToBasket"
                @remove-to-basket="removeToBasket">

            </eat-item>
        </div>
    </div>
</template>

<script>


import EatItem from '@/components/EatItem.vue'
import {mapMutations} from 'vuex'
export default {
    name:'page-eat',
    components:{
        EatItem
    },
    data() {
        return{
            sumBasket: null,
            basket:[],
            eatList:[
                {
                "id": 0,
                "product": "Классика",
                "icon": require("@/assets/images/icons/icon-shawarma.png"),
                "alt": "Шаверма",
                "structure": 'Курица, овощи, классический соус',
                checkedAdd: [],
                addSum: [],
                addMenu:[
                    {
                        "id": 0,
                        "name": 'Соус',
                        "add": 'sauce',
                        "price": 0
                    },
                    {
                        "id": 1,
                        "name": 'Мясо',
                        "add": 'meat',
                        "price": 30
                    },
                    {
                        "id": 2,
                        "name": 'Халапеньо',
                        "add": 'jalapeno',
                        "price": 40
                    },
                    {
                        "id": 3,
                        "name": 'Сыр',
                        "add": 'cheese',
                        "price": 50
                    }
                ],
                types: [
                        {
                            "product": "Классика",
                            "typeId": 0,
                            "type":"В лаваше",
                            "price": 209,
                            "count": false,
                            "howmany": 0
                        },
                        {
                            "product": "Классика",
                            "typeId": 1,
                            "type":"В пите",
                            "price": 179,
                            "count": false,
                            "howmany": 0
                        },
                        {
                            "product": "Классика",
                            "typeId": 2,
                            "type":"На тарелке",
                            "price": 269,
                            "count": false,
                            "howmany": 0
                        }
                    ],
                },
                {
                "id": 1,
                "product": "Острая",
                "icon": require("@/assets/images/icons/pepper.png"),
                "alt": "Шаверма",
                "structure": 'Курица, овощи, классический соус, острый соус, халапеньо',
                checkedAdd: [],
                addSum:[],
                addMenu:[
                    {
                        "id": 0,
                        "name": 'Соус',
                        "add": 'sauce',
                        "price": 0
                    },
                    {
                        "id": 1,
                        "name": 'Мясо',
                        "add": 'meat',
                        "price": 30
                    },
                    {
                        "id": 2,
                        "name": 'Халапеньо',
                        "add": 'jalapeno',
                        "price": 40
                    },
                    {
                        "id": 3,
                        "name": 'Сыр',
                        "add": 'cheese',
                        "price": 50
                    }
                ],
                types: [
                        {
                            "product": "Острая",
                            "typeId": 4,
                            "type":"В лаваше",
                            "price": 229,
                            "howmany": 0
                        },
                        {
                            "product": "Острая",
                            "typeId": 5,
                            "type":"В пите",
                            "price": 199,
                            "howmany": 0
                        },
                        {
                            "product": "Острая",
                            "typeId": 6,
                            "type":"На тарелке",
                            "price": 289,
                            "howmany": 0
                        }
                    ],
                },
                {
                "id": 2,
                "product": "Сырная",
                "icon": require("@/assets/images/icons/cheese.png"),
                "alt": "Шаверма",
                "structure": 'Курица, овощи, сыр, сырный соус, классический соус, сырный лаваш',
                checkedAdd: [],
                addSum:[],
                addMenu:[
                    {
                        "id": 0,
                        "name": 'Соус',
                        "add": 'sauce',
                        "price": 0
                    },
                    {
                        "id": 1,
                        "name": 'Мясо',
                        "add": 'meat',
                        "price": 30
                    },
                    {
                        "id": 2,
                        "name": 'Халапеньо',
                        "add": 'jalapeno',
                        "price": 40
                    },
                    {
                        "id": 3,
                        "name": 'Сыр',
                        "add": 'cheese',
                        "price": 50
                    }
                ],
                types: [
                        {
                            "product": "Сырная",
                            "typeId": 7,
                            "type":"В лаваше",
                            "price": 239,
                            "howmany": 0
                        },
                        {
                            "product": "Сырная",
                            "typeId": 8,
                            "type":"В пите",
                            "price": 199,
                            "howmany": 0
                        },
                        {
                            "product": "Сырная",
                            "typeId": 9,
                            "type":"На тарелке",
                            "price": 289,
                            "howmany": 0
                        }
                    ],
                },
                {
                "id": 3,
                "product": "Мини-шаверма",
                "icon": require("@/assets/images/icons/kebab.png"),
                "alt": "Шаверма",
                "structure": 'Мини классика: курица, овощи, классический соус',
                checkedAdd: [],
                addSum:[],
                addMenu:[
                    {
                        "id": 0,
                        "name": 'Соус',
                        "add": 'sauce',
                        "price": 0
                    },
                    {
                        "id": 1,
                        "name": 'Мясо',
                        "add": 'meat',
                        "price": 30
                    },
                    {
                        "id": 2,
                        "name": 'Халапеньо',
                        "add": 'jalapeno',
                        "price": 40
                    },
                    {
                        "id": 3,
                        "name": 'Сыр',
                        "add": 'cheese',
                        "price": 50
                    }
                ],
                types: [
                        {
                            "product": "Мини-шаверма",
                            "typeId": 10,
                            "type":"Мини",
                            "price": 159,
                            "howmany": 0
                        }
                    ],
                },
                {
                "id": 4,
                "product": "Барбекю",
                "icon": require("@/assets/images/icons/grill.png"),
                "alt": "Шаверма",
                "structure": 'Курица, овощи, сыр, бекон, классический соус, BBQ соус',
                checkedAdd: [],
                addSum:[],
                addMenu:[
                    {
                        "id": 0,
                        "name": 'Соус',
                        "add": 'sauce',
                        "price": 0
                    },
                    {
                        "id": 1,
                        "name": 'Мясо',
                        "add": 'meat',
                        "price": 30
                    },
                    {
                        "id": 2,
                        "name": 'Халапеньо',
                        "add": 'jalapeno',
                        "price": 40
                    },
                    {
                        "id": 3,
                        "name": 'Сыр',
                        "add": 'cheese',
                        "price": 50
                    }
                ],
                types: [
                        {
                            "product": "Барбекю",
                            "typeId": 11,
                            "type":"В лаваше",
                            "price": 260,
                            "howmany": 0
                        },
                        {
                            "product": "Барбекю",
                            "typeId": 12,
                            "type":"В пите",
                            "price": 220,
                            "howmany": 0
                        },
                        {
                            "product": "Барбекю",
                            "typeId": 13,
                            "type":"На тарелке",
                            "price": 299,
                            "howmany": 0
                        }
                    ],
                },
                {
                "id": 5,
                "product": "Грибная",
                "icon": require("@/assets/images/icons/mushroom.png"),
                "alt": "Шаверма",
                "structure": 'Курица, овощи, обжаренные грибы с луком, грибно-сметанный соус, классический соус',
                checkedAdd: [],
                addSum:[],
                addMenu:[
                    {
                        "id": 0,
                        "name": 'Соус',
                        "add": 'sauce',
                        "price": 0
                    },
                    {
                        "id": 1,
                        "name": 'Мясо',
                        "add": 'meat',
                        "price": 30
                    },
                    {
                        "id": 2,
                        "name": 'Халапеньо',
                        "add": 'jalapeno',
                        "price": 40
                    },
                    {
                        "id": 3,
                        "name": 'Сыр',
                        "add": 'cheese',
                        "price": 50
                    }
                ],
                types: [
                        {
                            "product": "Грибная",
                            "typeId": 14,
                            "type":"В лаваше",
                            "price": 260,
                            "howmany": 0
                        },
                        {
                            "product": "Грибная",
                            "typeId": 15,
                            "type":"В пите",
                            "price": 220,
                            "howmany": 0
                        },
                        {
                            "product": "Грибная",
                            "typeId": 16,
                            "type":"На тарелке",
                            "price": 299,
                            "howmany": 0
                        }
                    ],
                },
                {
                "id": 6,
                "product": "Биг Тейсти",
                "icon": require("@/assets/images/icons/sauce.png"),
                "alt": "Шаверма",
                "structure": 'Курица, овощи, сыр Чеддер, соус Биг Тейсти, классический соус',
                checkedAdd: [],
                addSum:[],
                addMenu:[
                    {
                        "id": 0,
                        "name": 'Соус',
                        "add": 'sauce',
                        "price": 0
                    },
                    {
                        "id": 1,
                        "name": 'Мясо',
                        "add": 'meat',
                        "price": 30
                    },
                    {
                        "id": 2,
                        "name": 'Халапеньо',
                        "add": 'jalapeno',
                        "price": 40
                    },
                    {
                        "id": 3,
                        "name": 'Сыр',
                        "add": 'cheese',
                        "price": 50
                    }
                ],
                types: [
                        {
                            "product": "Биг Тейсти",
                            "typeId": 17,
                            "type":"В лаваше",
                            "price": 260,
                            "howmany": 0
                        },
                        {
                            "product": "Биг Тейсти",
                            "typeId": 18,
                            "type":"В пите",
                            "price": 220,
                            "howmany": 0
                        },
                        {
                            "product": "Биг Тейсти",
                            "typeId": 19,
                            "type":"На тарелке",
                            "price": 299,
                            "howmany": 0
                        }
                    ],
                },
                {
                "id": 7,
                "product": "Деревенская",
                "icon": require("@/assets/images/icons/potato.png"),
                "alt": "Шаверма",
                "structure": 'Курица, овощи, картошка, бекон, маринованные огурцы, сметана, классический соус',
                checkedAdd: [],
                addSum:[],
                addMenu:[
                    {
                        "id": 0,
                        "name": 'Соус',
                        "add": 'sauce',
                        "price": 0
                    },
                    {
                        "id": 1,
                        "name": 'Мясо',
                        "add": 'meat',
                        "price": 30
                    },
                    {
                        "id": 2,
                        "name": 'Халапеньо',
                        "add": 'jalapeno',
                        "price": 40
                    },
                    {
                        "id": 3,
                        "name": 'Сыр',
                        "add": 'cheese',
                        "price": 50
                    }
                ],
                types: [
                        {
                            "product": "Деревенская",
                            "typeId": 20,
                            "type":"В лаваше",
                            "price": 250,
                            "howmany": 0
                        },
                        {
                            "product": "Деревенская",
                            "typeId": 21,
                            "type":"В пите",
                            "price": 210,
                            "howmany": 0
                        },
                        {
                            "product": "Деревенская",
                            "typeId": 22,
                            "type":"На тарелке",
                            "price": 289,
                            "howmany": 0
                        }
                    ],
                },
            ],
        }
    },
    methods: {
        ...mapMutations(['changeBasket']),
        newBasketPush(){
            this.changeBasket({
                newValue: this.basket,
                // product:this.basket.product,
                // typeId:this.basket.typeId,
                // type:this.basket.type,
                // price:this.basket.price,
                // howmany:this.basket.howmany,
                // id:this.basket.id,
            })
        },
        addToBasket(item, type, typeIndex){
            typeIndex 
            type.product = item.product
            type.addMenu = item.addMenu
            type.checkedAdd = item.checkedAdd
            type.id = item.id
            if(type.howmany == true) {
                this.basket.push(type)
            } else {
                this.basket.howmany = this.basket.howmany + 1 
            }

            this.reduceSum()

        },
        removeToBasket(item, type, typeIndex){ ////////////
            typeIndex            
            if(type.howmany == 0){
                this.basket = this.basket.filter(i =>i.typeId !== type.typeId )
            } else this.basket.howmany = this.basket.howmany - 1

            this.reduceSum()
        },
        reduceSum(){ ///////////сумма корзины
            this.sumBasket = this.basket.map(item =>  item.price * item.howmany)
                .reduce((price, sum) => sum + price, 0) 

            this.$emit('reduceSum', this.sumBasket, this.basket)

        },
        
    },
    mounted(){
        
        if(sessionStorage.basket){
            this.basket = JSON.parse(sessionStorage.basket)
        }
        // if(sessionStorage.toBePaid){
        //     basket.toBePaid = JSON.parse(sessionStorage.basket)
        // }
    },
    watch:{
        basket:{
            handler(newSum){
                sessionStorage.basket = JSON.stringify(newSum)
            },
            deep: true
        },

    },
    computed:{

    },
}
</script>