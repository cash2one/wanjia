<template>
    <div  class="addTravelerMainDiv">
       <div class="addTravelerDiv">
           <div >
               出行人姓名
           </div>
           <div class="addTravelerInfo">
               <span class="leftTitle">中文姓名</span>
               <input class="addTravelerInput" placeholder="与证件姓名一至" v-model="name">
           </div>
       </div>
          
       <div class="addTravelerDiv">
           <div >
               证件信息
           </div>
           <div class="addTravelerInfo">
               <span class="leftTitle">证件类型</span>
               <span>身份证</span>
           </div>
           <div class="addTravelerInfo">
               <span class="leftTitle">证件号码</span>
                <input class="addTravelerInput" placeholder="所持证件号码" type="number"  >
           </div>
       </div>   
       
       <div class="addTravelerDiv">
           <div >
               其他信息
           </div>
           <div class="addTravelerInfo">
               <span class="leftTitle">联系方式</span>
               <input class="addTravelerInput" placeholder="出行人联系方式" type="tel" v-model="contact">
           </div>
       </div>
       <div style="text-align: center">
            <button type="" class="chooseTravelerButton" @click="save" >保存</button>
       </div>
      

    </div>
</template>
<script>
import axios from 'axios'
 import qs from 'qs'
  export default {
    data() {
      return {
        peopleId:0,
        name:"",
        identity:"",
        contact:"",
        inputIdentity:{}
      }
  },
  mounted(){
      if(!isWebchat()){
        login()
      }
      this.inputIdentity = document.getElementsByClassName('addTravelerInput')[1]

      document.title = "添加行人"
      if(!isEmpty(this.$store.state.editPeople)){
         let people = this.$store.state.editPeople
         this.peopleId = people.id
         this.name = people.name
         this.identity = people.identityCard
         this.inputIdentity.value = this.identity
         document.title = "编辑出行人"
      }
      
        
  },
  methods:{
      save(){
          if(this.name.length <=0){
              this.toast('姓名不能为空')
              return
          }
          this.identity = this.inputIdentity.value
          if(!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.identity)){
              this.toast('身份证格式错误')
              return
          }
        //   if(!/^1(3|4|5|7|8)\d{9}$/.test(this.contact)){
        //     this.toast('手机号格式错误')
        //     return
        //   }
        
          let para = {name:this.name,identityCard:this.identity}
          if(this.peopleId != 0){
              para.id = this.peopleId
          }
          let url = 'https://app.playnet.cc/index/assist/mod_contacts/wjkey/' + localStorage.key
          let that = this
          axios.post(url,qs.stringify(para)).then(response=>{ //目前不能添加，只能个性，不知道为什么
            var res = response.data;
            if(res.ret_code == 0) {
                //that.toast('行人成功保存')
                that.$router.back()
            }
            else{
                
            }
        })
      },
     
    
  },
  components:{
      
  }
}
</script>
<style>
.addTravelerMainDiv{
    font-size: 0.6rem;
    color: #565
}
.addTravelerDiv{
    padding: 0.2rem 0.2rem;
    background: white;
    margin-bottom: 0.2rem;
}
.leftTitle{
    padding-right: 0.4rem;
    
}    
.addTravelerInfo{
    border-top: 1px solid #ddd;
    margin-top: 0.2rem;
    padding-top: 0.16rem;
}  
.addTravelerInput{
    font-size: 0.5rem;
}      
.saveTraveler{
    margin-top: 1rem;
    margin-left: 0.75rem;
}   
</style>