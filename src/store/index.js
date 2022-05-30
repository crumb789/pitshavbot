import { createStore } from 'vuex'
import post from './modules/post'
import basket from './modules/basket'


export default createStore({
  modules: {
    post,
    basket
  }
})
