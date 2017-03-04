import Vue from 'vue'
import './tool/tool'  //this is important
import VueRouter from 'vue-router'
import routes from './router/router'
import app from './App.vue'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import Vuex from 'vuex'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production'
})


import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(Vuex)

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)



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


new Vue({
	router,
	store,
	render:h=>h(app)
}).$mount('#app')