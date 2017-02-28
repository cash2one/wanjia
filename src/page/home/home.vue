<template>
  	<div>
        <div class="mainContent">
            <div class="mainContent1">
                <mainPage></mainPage>
            </div>
            <div class="mainContent2">
                <orderList></orderList>
            </div>
            </div>

            <tabbar class="wbTabBar" >
            <tabbar-item :selected="selected == '预定'" @on-item-click='tanBarClick(0)' >
                <img slot="icon" src="static/img/main/preorder.png">
                <span slot="label">预定</span>
            </tabbar-item>
            <tabbar-item :selected="selected == '我的'" @on-item-click='tanBarClick(1)'>
                <img slot="icon" src="static/img/main/my.png">
                <span slot="label">我的</span>
           </tabbar-item>
        </tabbar>headTop
    </div>
</template>

<script>
 import mainPage from './main.vue'
 import orderList from '../order/orderList.vue'
 import { Tabbar, TabbarItem } from 'vux'


// import getUidFromWebchat from '../../store/sevice'
export default {
    data(){
        return{
          selected: '预定'
        }
    },

	mounted(){
      document.title = "玩加"
      
      if(!isWebchat()){
        login()
      }
      //这个地方需要地微信里处理
      if(!isLogin()){
       // getUidFromWebchat()
      }
    },

    components:{
        mainPage,orderList,Tabbar, TabbarItem
    },

    computed:{
        //将获取的数据按照A-Z字母开头排序
     
    },

    methods:{
      
    },
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .mainContent{
  z-index: 1;
  
}
.mainContent1{
  height: 93vh;
  overflow: scroll;
}
.mainContent2{
  display: none;
}
.wbTabBar{
  height: 1.5rem;
  font-size: 0.5rem;
  z-index: 100;
  position: fixed !important;
}
.weui-tabbar__label{
  font-size: 0.5rem !important;
  margin-top: -0.2rem !important;
  
}
.weui-tabbar__item{
  text-decoration: none;
}
.weui-tabbar__icon{
  width: 0.8rem !important;
  height: 0.8rem !important;
  margin-top: -0.1rem;
}
</style>
