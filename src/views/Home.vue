<template>
  <div class="container">

<!-- <button @click="postMsg">change</button>
<button @click="getInfo">get</button> -->
    <side-menu  :class="{active: sideMenu === true}"
      
      @go-to-side-menu="goToSideMenu"
    >

    </side-menu>
    <MainHeader
      :firstName="firstName"
      :lastName="lastName"
      :openMenuItem="openMenuItem"
      :sumBasket="sumBasket"
      :sumDrinkBasket='sumDrinkBasket'
      :sideMenu='sideMenu'
      :totalSum='totalSum'
      
      @back-to-home="backToHome"
      @go-to-basket="goToBasket">

    </MainHeader>


  <div class="menu-list" :class="{menuMiniList: openMenuItem !== false}">
    <menu-list 
      :openMenuItem="openMenuItem">
        <menu-item v-for="item in menuList" :key="item.id" @click="openMenuItem = item.id"
          :item="item"
          :openMenuItem="openMenuItem">

        </menu-item>
    </menu-list>  
  </div>  

  <transition name="slide-fade">
    <eat v-if="openMenuItem === 0" 
        @reduceSum="getSumBasket">

    </eat>
  </transition>

  <transition name="slide-fade">
    <drinks v-if="openMenuItem === 1"

      @reduceDrinkSum='getDrinkSumBasket'
      >

    </drinks>
  </transition>

  <transition name="slide-fade">
    <beer v-if="openMenuItem === 2">

    </beer>
  </transition>

  <transition name="slide-fade">
    <basket v-if="openMenuItem === 'basket'" 
      :basket="basket"
      :basketDescription="basketDescription"
      :drinkBasket='drinkBasket'

      
      @remove-this-cart='removeThisCart'
      @basket-descr-submit="basketDescrSubmit"
      @go-to-pay='goToPay'
      @choise-address='choiseAddress'
      @push-to-name='PushToName'
      @remove-this-drink-cart="removeThisDrinkCart">

    </basket>
  </transition>


  <about-us v-if="openMenuItem === 'about-us'">

  </about-us>


  <place v-if="openMenuItem === 'place'">

  </place>







  <footer-buttons>
    <div @click="backToHome" v-if="openMenuItem !== false && !sideMenu"  class="btn btn-success">
        <i class="bi bi-caret-left"></i>
    </div>
    <button  v-if="openMenuItem !== 'basket'"
      @click="sideMenuChange" type="button" class="btn btn-primary sideMenu">
      <div class="side-menu-btn" :class="{rotate: sideMenu}"></div>
      <div class="side-menu-btn" :class="{hide: sideMenu}"></div>
      <div class="side-menu-btn" :class="{rotateBack: sideMenu}"></div>
      <i   class="bi bi-x-lg show-rotate" v-if="sideMenu"></i>        
    </button>

  </footer-buttons>

  <footer-item>

  </footer-item>


  </div>
</template>

<script>
// @ is an alias to /src


import axios from 'axios'
import MenuList from '@/components/MenuList.vue'
import MainHeader from '@/components/MainHeader.vue'
import MenuItem from '@/components/MenuItem.vue'
import Eat from '@/components/Eat.vue'
import Drinks from '@/components/Drinks.vue'
import Basket from '@/components/Basket.vue'
import FooterButtons from '@/components/FooterButtons.vue'
import SideMenu from '@/components/SideMenu.vue'
import AboutUs from '@/components/AboutUs.vue'
import Place from '@/components/Place.vue'
import Beer from '@/components/Beer.vue'
import FooterItem from '@/components/FooterItem.vue'






// import telegramApi from 'telegram-api-vue'
// import bot from '@/index.js'

export default {
  name: 'Home',
  components: {
    MenuList,
    MainHeader,
    MenuItem,
    Eat,
    Drinks,
    Basket,
    FooterButtons,
    SideMenu,
    AboutUs,
    Place,
    Beer,
    FooterItem
  },
  data(){
    return{
      color: window.Telegram.WebApp.colorScheme,
      userMsg:null,
      username: null,
      lastName: null,
      firstName: null,
      userChatId: null,

      groupIdOne: -675639988,
      groupIdTwo: -625600744,

      sideMenu: false,
      response: undefined,
      openMenuItem: false,
      page: this.$route,

      sumBasket: null,
      basket: [],
      sumDrinkBasket: null,
      drinkBasket: [],

      totalSum: [],

      basketDescription: null,
      currentAddress: null,
      errorMsg: '',
      drinkList:[
        {
          "id": 0,
          "name": "",
          "price": 69
        },
        {
          "id": 1,
          "name": "",
          "price": 85
        },
        {
          "id": 2,
          "name": "",
          "price": 100
        }
      ],
      menuList: [
        {
          "id":0,
          "product": "Шаверма",
          "productImage": require("@/assets/images/newLogo.png"),
          "alt": "Шаверма",
          "link": "#/eat"
        },
        {
          "id":1,
          "product": "Напитки",
          "productImage": require("@/assets/images/soft-drink (1).png"),
          "alt": "Напитки",
          "link": "#/drinks"
        },
        {
          "id":2,
          "product": "Пиво",
          "productImage": require("@/assets/images/beer.png"),
          "alt": "Напитки",
          "link": "#/drinks"
        }
      ],


      //////telegram bot config
      telegramUrl: `https://api.telegram.org/bot5395990399:AAGURhsvwIevsjCGNCAEKUfP5xtiHdJhQPI`,
      token: '5395990399:AAGURhsvwIevsjCGNCAEKUfP5xtiHdJhQPI',
      chatId: null,
      botInfo: null


    }
  },
  methods: {
    // colorScheme(){
    //   console.log(window.Telegram.WebApp.colorScheme)
    // },
    async postMsg(){
      let Message = `hi ${this.firstName} ${this.lastName}`
      let msg = `, i'm bot PitShav`

      try{
        axios.post(`${this.telegramUrl}/sendMessage?chat_id=${this.userChatId}&text=${Message} ${msg}`)
          
      } catch(e){
        console.log('Error')
        this.errorMsg = 'Error'

      }

      setTimeout(()=>{
        // this.closeApp()
      }, 3000)
    },
    //////////////получение инфы о боте, чтобы при изменении подгружалась акт инфа
    async getInfo(){
        axios.get(`${this.telegramUrl}/getMe`, {
          headers:{
            Accept: "application/json, text/plain, */*"
          }
            
        }).then(resp => {
          console.log(resp.data.result);
          this.botInfo = resp.data.result
        })


    },
    backToHome(){
      this.openMenuItem = false
    },
    sideMenuChange(){
      this.sideMenu = !this.sideMenu
    },
    goToBasket(){
      this.openMenuItem = 'basket'
    },
    removeThisCart(item){ //////remove basket item
      this.basket = this.basket.filter(i => i.typeId !== item.typeId)
    },
    removeThisDrinkCart(item){  //////remove drink basket item
      this.drinkBasket = this.drinkBasket.filter(i => i.typeId !== item.typeId)
    },
    getSumBasket(sumBasket, basket){
      this.sumBasket = sumBasket

      this.basket = basket
    },
    getDrinkSumBasket(sumDrinkBasket, drinkBasket){
      this.sumDrinkBasket = sumDrinkBasket

      this.drinkBasket = drinkBasket
    },
    basketDescrSubmit(newDescr){
      this.basketDescription = newDescr
    },
    choiseAddress(address){
      this.currentAddress = address
    },
    goToSideMenu(item){
      this.openMenuItem = item.link
    },
    addSum(){ //////////сумма допов прибавляется к цене
        for(let i = 0; i < this.basket.length; i++){
            let sum = this.basket[i].price
            let arr = this.basket[i].checkedAdd.reduce((p, sum)=> sum + p, 0)
            this.basket[i].arrSum = arr + sum
        }
        
    },
    PushToName(item,index,menu,indexMenu){
      index,menu,indexMenu
      // let names = []
      //   if(this.basket[index].checkedAdd.includes(menu.price)){
      //     names.push(menu.name)
      //   } else names.push(0)
      // this.basket[index].names = names

      let names = [] 
        this.basket[index].checkedAdd.forEach(price=>{
          (price === 0) ? names.push('Соус') : 
          (price === 30) ? names.push('Мясо') :
          (price === 40) ? names.push('Халапеньо') :
          (price === 50) ? names.push('Сыр') : 0
        })
          this.basket[index].names = names
    },
  async goToPay(){      
    let bsk = []
    let basketDrink = []
    for(let i = 0; i < this.basket.length; i++){
      var eat = ` ${this.basket[i].product}: %0A ${this.basket[i].type} + ${this.basket[i].checkedAdd} количество: ${this.basket[i].howmany} %0A `
      bsk.push(eat)
    }
    for(let i = 0; i < this.drinkBasket.length; i++){
      var drinks = ` ${this.drinkBasket[i].product}: %0A ${this.drinkBasket[i].type} %0A количество: ${this.drinkBasket[i].howmany} %0A `
      basketDrink.push(drinks)
    }
      let Message = `
        *${this.firstName} ${this.lastName}* %0A 
        *Login:* @${this.username} %0A
        _Ваш заказ на сумму_ *${this.totalSum}* р. 
        ${bsk}, ${basketDrink}
        *Address: ${this.currentAddress}*
      `
      console.log(bsk, basketDrink)

      try{
        axios.post(`${this.telegramUrl}/sendMessage?chat_id=${this.userChatId}&parse_mode=Markdown&text=${Message}, 
          комментарий к заказу: ${this.basketDescription}`)

      } catch(e){
        console.log('Error')

      }

      //////в како чат отправить сообщение
      (this.currentAddress === "Комендантский просп., 12, корп. 1") ? this.msgToGroupOne() : this.msgToGroupTwo()


      setTimeout(()=>{
        this.closeApp()
      }, 1500)
  },
  async msgToGroupOne(){     ///////////komenda
      let Message = `*${this.firstName} ${this.lastName}* %0A`+ 
      ` *Login:* @${this.username} %0A`+ 
      ` _Заказ на сумму_ *${this.totalSum} р.* %0A`
      
      let bsk = []
      let basketDrink = []
      for(let i = 0; i < this.basket.length; i++){
        var a = ` ${this.basket[i].product}: %0A ${this.basket[i].type} - ${this.basket[i].names} количество: ${this.basket[i].howmany} %0A `
        
        bsk.push(a)
      }
      for(let x = 0; x < this.drinkBasket.length; x++){
        var drinks = ` *${this.drinkBasket[x].product}*: %0A ${this.drinkBasket[x].type} %0A количество: ${this.drinkBasket[x].howmany} %0A `

        basketDrink.push(drinks)
        console.log(drinks)
      }
        // console.log(`${Message}, корзина - ${bsk}  комментарий к заказу: ${this.basketDescription}`)

      try{
        axios.post(`${this.telegramUrl}/sendMessage?chat_id=${this.groupIdOne}&parse_mode=Markdown&text=${Message} *Корзина*: 
        %0A ${bsk}  %0A ${drinks} %0A
        *Комментарий к заказу:* _${this.basketDescription}_`)

      } catch(e){
        console.log('Error')

      }
  },
  async msgToGroupTwo(){     ///////////nastavnikov
      let Message = `*${this.firstName} ${this.lastName}* %0A`+ 
      ` *Login:* @${this.username} %0A`+ 
      ` _Заказ на сумму_ *${this.totalSum} р.* %0A`
      
      let bsk = []
      let basketDrink = []
      for(let i = 0; i < this.basket.length; i++){
        var a = ` ${this.basket[i].product}: %0A ${this.basket[i].type} - ${this.basket[i].names} количество: ${this.basket[i].howmany} %0A `
        
        bsk.push(a)
      }
      for(let x = 0; x < this.drinkBasket.length; x++){
        var drinks = ` *${this.drinkBasket[x].product}*: %0A ${this.drinkBasket[x].type} %0A количество: ${this.drinkBasket[x].howmany} %0A `

        basketDrink.push(drinks)
        console.log(drinks)
      }
        // console.log(`${Message}, корзина - ${bsk}  комментарий к заказу: ${this.basketDescription}`)

      try{
        axios.post(`${this.telegramUrl}/sendMessage?chat_id=${this.groupIdTwo}&parse_mode=Markdown&text=${Message} *Корзина*: 
        %0A ${bsk}  %0A ${drinks} %0A
        *Комментарий к заказу:* _${this.basketDescription}_`)

      } catch(e){
        console.log('Error')

      }
  },
  totalSumMath(){
    this.totalSum = this.sumBasket + this.sumDrinkBasket
  },


    //////////////проверка ласт сообщения
    // checkUser(){
    //   axios.get(`${this.telegramUrl}/getUpdates`, {
    //     params:{
    //         // limit: 1
    //     },

    //       headers:{
    //         Accept: "application/json, text/plain, */*"
    //       }
            
    //     }).then(resp => {
    //       this.userMsg = resp.data.result[resp.data.result.length - 1].message
    //       console.log(resp.data)

    //       this.chatId = this.userMsg.chat.id

    //       if(this.userMsg.text === '/start'){
    //         axios.post(`${this.telegramUrl}/sendMessage?chat_id=${this.chatId}&text=Привет`)
    //       }
    //     })
    // },
    toTopPage(){
      window.scrollTo(0, 0)
    },

    nameGet(){      
      const initData = window.Telegram.WebApp.initData || ''
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe || {};
      initData
      this.firstName = initDataUnsafe.user.first_name
      this.lastName = initDataUnsafe.user.last_name
      this.userChatId = initDataUnsafe.user.id
      this.username = initDataUnsafe.user.username

      
      
    },
    closeApp(){ //////////////закрыть окно web app
      window.Telegram.WebApp.close();
    }


  },
  created(){
    window.Telegram.WebApp.ready(); //////инициализация web app
    window.Telegram.WebApp.expand() ///////web app на всю высоту
    this.nameGet()

  },
   
  computed: {

  },
  mounted(){
    if(sessionStorage.sumBasket){
            this.sumBasket = JSON.parse(sessionStorage.sumBasket)
    }
    if(sessionStorage.basket){
            this.basket = JSON.parse(sessionStorage.basket)
    }
    if(sessionStorage.sumDrinkBasket){
            this.sumDrinkBasket = JSON.parse(sessionStorage.sumDrinkBasket)
    }
    if(sessionStorage.drinkBasket){
            this.drinkBasket = JSON.parse(sessionStorage.drinkBasket)
    }
    if(sessionStorage.openMenuItem){
            this.openMenuItem = JSON.parse(sessionStorage.openMenuItem)
    }
    if(sessionStorage.basketDescription){
            this.basketDescription = JSON.parse(sessionStorage.basketDescription)
    }
  },
  watch: {
    sumBasket:{
            handler(newSum){
                sessionStorage.sumBasket = JSON.stringify(newSum)
            },
            deep: true
        },
    sumDrinkBasket:{
      handler(newSum){
                sessionStorage.sumDrinkBasket = JSON.stringify(newSum)
            },
            deep: true
    },
    basket:{
        handler(newSum){
            this.addSum() //////при добавлении допов
            sessionStorage.basket = JSON.stringify(newSum)
            this.sumBasket = this.basket.map(item =>  item.arrSum  * item.howmany)
            .reduce((price, sum) => sum + price, 0) 
            
            this.totalSumMath()
        },
        deep: true
    },
    drinkBasket:{
      handler(newValue){
            sessionStorage.drinkBasket = JSON.stringify(newValue)
            this.sumDrinkBasket = this.drinkBasket.map(item =>  item.price * item.howmany)
            .reduce((price, sum) => sum + price, 0) 

              this.totalSumMath()
        },  
        deep: true
    },
    openMenuItem:{
      handler(newVal){
        sessionStorage.openMenuItem = JSON.stringify(newVal)
        this.sideMenu = false
        this.toTopPage()
      }
    },
    basketDescription:{
      handler(newValue){
        sessionStorage.basketDescription = JSON.stringify(newValue)
      }
    }
  }
}
</script>


<style lang="scss">


</style>
