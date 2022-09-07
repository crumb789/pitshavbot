<template>
    <div class="header">
      <h1 class="header-user" >
        Здравствуй, 
        <span style="font-weight: 700;">
          <h4>{{firstName}}  {{lastName}}</h4>
        </span>
      </h1>
      
      <button :disabled='totalSum.length < 1' type="button" class="btn btn-light header-basket" :class="{headerBasketActive: openMenuItem === 'basket'}">
          <!-- <div class="header-basket-sum" v-if="basket.toBePaid !== null">{{basket.toBePaid.newPaid}} 
            <span v-if="basket.toBePaid.newPaid !== null"> р.</span>
          </div> -->
          <div class="header-basket-sum" v-if="totalSum.length > 0 || totalSum > 0">{{totalSum}} 
            <span v-if="totalSum.length > 0 || totalSum > 0"> р.</span>
          </div>
          <a  @click="$emit('go-to-basket')">
            <i class="bi bi-cart3"></i>
            <i v-if="false" class="bi bi-cart4"></i>
          </a>
      </button>

    </div>
</template>

<script>
// import {mapGetters} from 'vuex'
import {mapMutations, mapState} from 'vuex'

export default {
    name:'main-header',
    props: {
        firstName:{
            type: String,
            require:true
        },
        lastName:{
            type: String,
            require:true
        },
        openMenuItem:{
          require: true
        },
        sumBasket:{
          type: Number
        },
        sumDrinkBasket:{
          type: Number
        },
        sideMenu:{
          type: Boolean
        },
        totalSum:{
          require: true
        }
    },
    data() {
        return{
          page: this.$route,
          // headerSumBasket: undefined
          // sumBasket: undefined
        }
    },
    methods: {
      ...mapMutations(['changepaid']),
      newPaidPush(){
        this.changepaid({
          newPaid: this.sumBasket
        })
      },
      goBasket(){
        
      }
    },
    
    watch:{
      sumBasket:{
        handler(){
              this.newPaidPush()
             
            }
      }
    },
    computed: mapState(['basket']),
      
    // computed: mapGetters(['sumBasket'])
}
</script>