import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import app from './app.vue'
import routes from './router.js'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)
Vue.use(VueRouter)
Vue.use(vueResource)
var router = new VueRouter({routes})

new Vue({router,vueResource,render:h=>h(app)}).$mount('#app')
