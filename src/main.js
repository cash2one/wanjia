import Vue from 'vue'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import app from './app.vue'
import routes from './router.js'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

import { Header } from 'mint-ui';
Vue.component(Header.name, Header);


import { Button } from 'mint-ui';

Vue.component(Button.name, Button);

import { Navbar, TabItem } from 'mint-ui';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

Vue.use(VueRouter)
Vue.use(vueResource)
var router = new VueRouter({routes})

new Vue({router,vueResource,render:h=>h(app)}).$mount('#app')
