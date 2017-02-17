<template>
    <div>
      <div>
          <mt-tab-container class="page-tabbar-container" v-model="selected">
            <mt-tab-container-item id="首页">
             <mainPage></mainPage>
            </mt-tab-container-item>
            <mt-tab-container-item id="我的">
              <mt-cell v-for="n in 5" :title="'我的 ' + n" />
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
 import axios from 'axios'
 export default{
    data() {
      return {
       selected: '首页'
      }
    },
    mounted(){
      document.title = "玩加"
      console.log(isWebchat())
      //先看有没有UID
      // if(!isWebchat()){
      //   return
      // }
     
      // if(localStorage.uid)
      // {

      // }
      console.log(window.location.href)
      //let code = window.location.href.match(/=[\S]*&/).toString().replace('=','').replace('&','')
      let code = '001F7voI15B7L50ZzvpI1w7soI1F7voD'
      let url = 'http://wap.playnet.cc/html/wb.php?code=' + code
       console.log(code)
       axios.get(url).then(response=>{
           console.log(response)
       })
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