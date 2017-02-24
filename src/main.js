import './tool/tool'
import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './app.vue'
import routes from './router.js'
import { Loadmore } from 'mint-ui';
import Vuex from 'vuex'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.component(Loadmore.name, Loadmore)
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)


import { Button } from 'mint-ui'
Vue.component(Button.name, Button)

import { Navbar, TabItem } from 'mint-ui'
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)



import { TabContainer, TabContainerItem } from 'mint-ui'
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)


import { Cell } from 'mint-ui'
Vue.component(Cell.name, Cell)



import { Tabbar } from 'mint-ui'
Vue.component(Tabbar.name, Tabbar)


Vue.use(VueRouter)
Vue.use(Vuex)




const store = new Vuex.Store({
  state: {
    webViewUrl:'',
    product:{},
    editPeople:{},
    choosedPeople:[]
  },
  mutations: {
   setWebUrl(state,url){
       console.log(url)
    state.webViewUrl = url
   },
   setProduct(state,product){
     state.product = product
   },
   setEditPeople(state,people){
     state.editPeople = people
   },
   setChoosedPeople(state,people){
     state.choosedPeople = people
   },
  },
  actions: {
    
  
  },
})

var router = new VueRouter({routes})

new Vue({router,store,render:h=>h(app)}).$mount('#app')
