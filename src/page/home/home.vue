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
        </tabbar>
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
    methods:{
      tanBarClick(index){
        if(index ==0 ){
          document.getElementsByClassName('mainContent2')[0].style.display = 'none'
          document.getElementsByClassName('mainContent1')[0].style.display = 'inherit'
        }
        else{
           document.getElementsByClassName('mainContent1')[0].style.display = 'none'
           document.getElementsByClassName('mainContent2')[0].style.display = 'inherit'
        }
      },
    },
}

</script>

<style>
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
  height: 2.2rem;
  font-size: 0.5rem;
  z-index: 100;
  position: fixed !important;
}
.weui-tabbar__label{
  font-size: 0.6rem !important;
  margin-top: -0.2rem !important;
}
.weui-tabbar__item{
  text-decoration: none;
}
.weui-tabbar__icon{
  width: 1.2rem !important;
  height: 1.2rem !important;
  margin-top: -0.1rem;
}
.weui-bar__item_on p span{
    color: red !important;
}
</style>
