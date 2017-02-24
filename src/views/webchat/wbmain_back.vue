<template>
    <div>
      <div>
          <mt-tab-container class="page-tabbar-container" v-model="selected">
            <mt-tab-container-item id="首页">
             <mainPage></mainPage>
            </mt-tab-container-item>
            <mt-tab-container-item id="我的">
              <orderList></orderList>
            </mt-tab-container-item>

         
          </mt-tab-container>
      </div>
      <mt-tabbar  v-model="selected" fixed class="mainTabBar">
        <mt-tab-item id="首页">
          首页
        </mt-tab-item>

        <mt-tab-item id="我的">
         
          我的
        </mt-tab-item>

     </mt-tabbar>
    </div>  
</template>
<script>
 import Vue from 'vue'
 import mainPage from './main/mainPage.vue'
 import orderList from './order/wbOrderList.vue'
 import axios from 'axios'
 import qs from 'qs'
 export default{
    data() {
      return {
       selected: '首页'
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
      orderList
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