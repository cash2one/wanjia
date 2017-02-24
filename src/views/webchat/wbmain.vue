<template>
    <div>
     
    <div class="wbMainContent">
      <div class="wbMainContent1">
        <mainPage></mainPage>
      </div>
      <div class="wbMainContent2">
        <orderList></orderList>
      </div>
    </div>

    <tabbar class="wbTabBar" >
      <tabbar-item :selected="selected == '预定'" @on-item-click='tanBarClick(0)' >
        <img slot="icon" src="../../static/img/preorder.png">
        <span slot="label">预定</span>
      </tabbar-item>
      <tabbar-item :selected="selected == '我的'" @on-item-click='tanBarClick(1)'>
        <img slot="icon" src="../../static/img/my.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>

    </div>  
</template>
<script>
 import Vue from 'vue'
 import mainPage from './main/mainPage.vue'
 import orderList from './order/wbOrderList.vue'
 import axios from 'axios'
 import qs from 'qs'
 import { Tabbar, TabbarItem } from 'vux'
 export default{
    data() {
      return {
       selected: '预定'
      }
    },
    mounted(){
      document.title = "玩加"
      if(!isWebchat()){
        login()
      }
      
   

      if(localStorage.key && typeof(localStorage.key) == 'string'){  //如果存在 Key，就获取用户信息
        this.getUserInfo()
        return
      }
      if(localStorage.uid){//如果不存在 Key，看有没有uid， 有的话就登录 
        console.log(localStorage.uid)
        this.login()
        return
      }
      //没有的话就获取uid
      let code = '0111JxaU0OaTcW19yQ8U0CWtaU01JxaK'
      if(isWebchat()){
         code = window.location.href.match(/=[\S]*&/).toString().replace('=','').replace('&','')
      }
      let url = 'http://wap.playnet.cc/html/wb.php?code=' + code
     
       var that = this
       axios.get(url).then(response=>{
            let data = response.data  
            if(data.unionid){
              localStorage.uid = data.unionid
              that.login()
            }
            else{
              console.log('数据错误，重新登录')
            } 
       })

      
    },
    methods:{
      tanBarClick(index){
        if(index ==0 ){
          document.getElementsByClassName('wbMainContent2')[0].style.display = 'none'
          document.getElementsByClassName('wbMainContent1')[0].style.display = 'inherit'
        }
        else{
           document.getElementsByClassName('wbMainContent1')[0].style.display = 'none'
           document.getElementsByClassName('wbMainContent2')[0].style.display = 'inherit'
        }
      },
      login(){
        let para = {uid:localStorage.uid}
        console.log(para)
        let that = this
        axios.post('https://app.playnet.cc/index/member/wxlogin',qs.stringify(para)).then(response=>{
           var res = response.data;
            if(res.ret_code == 0) {
              console.log(res)
               localStorage.key = res.data
               that.getUserInfo()
            }
            else{
               console.log('登录失败')
            }
           
       })
     
     },
      getUserInfo(){
        console.log('localStorage.key' + localStorage.key)
        let url = 'https://app.playnet.cc/index/assist/userInfo/wjkey/' + localStorage.key
        
        axios.get(url).then(response=>{
           var res = response.data;
           console.log(res.ret_code)
            if(res.ret_code == 0) {
              console.log(res)
              //这里弄到积分
              localStorage.integral = res.data.integral
              console.log(localStorage.integral)
            }
            else{
               console.log('请求失败')
            }
           
       })
      }
    },
    components:{
      mainPage,
      orderList,
      Tabbar, 
      TabbarItem
    }
 
   
 }
</script>
<style  lang="stylus">
.wbMainContent{
  z-index: 1;
  
}
.wbMainContent1{
  height: 93vh;
  overflow: scroll;
}
.wbMainContent2{
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