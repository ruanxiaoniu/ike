import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import product from './modules/product'
import customer from './modules/customer'
import complaint from './modules/complaint'
import permission from './modules/permission'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    product,
    customer,
    complaint,
    permission
  },
  getters
})

export default store
