<template>
    <div>
      <div>
          <mt-tab-container class="page-tabbar-container" v-model="selected">
            <mt-tab-container-item id="首页">
             <mainPage></mainPage>
            </mt-tab-container-item>
            <mt-tab-container-item id="订单">
              <mt-cell v-for="n in 5" :title="'订单 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="发现">
              <mt-cell v-for="n in 7" :title="'发现 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="退出">
              <div class="page-part">
                <mt-cell v-for="n in 12" :title="'我的 ' + n" />
              </div>
              <router-link to="/">
                <mt-button type="danger" size="large">退出</mt-button>
              </router-link>
            </mt-tab-container-item>
          </mt-tab-container>
      </div>
      <mt-tabbar  v-model="selected" fixed class="mainTabBar">
        <mt-tab-item id="首页">
          首页
        </mt-tab-item>
        <mt-tab-item id="订单">
        
          订单
        </mt-tab-item>
        <mt-tab-item id="我的">
         
          我的
        </mt-tab-item>
        <mt-tab-item id="退出">
         
          退出
        </mt-tab-item>
     </mt-tabbar>
    </div>  
</template>
<script>
 import Vue from 'vue'
 import mainPage from './main/mainPage.vue'
 export default{
    data() {
      return {
       selected: '首页'
      }
    },
    components:{
      mainPage
    }
 
   
 }
</script>
<style>
.mainTabBar{
  height: 1.5rem;

}
/*.mainTabBar a div:last-child{
  border-right: none;
}*/
.is-selected{
  background: white !important;
}
.mainTabBar a div{
  font-size:0.55rem;
  margin-top: 0.2rem;
  border-right: 1px solid #aaa;
}

</style>