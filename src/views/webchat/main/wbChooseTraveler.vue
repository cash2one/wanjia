<template>
    <div class="wbTravelerMain">
       <div>
           <div class="addTraveler">
              <button type="" @click="addTraveler"><span>+</span>添加出行人</button>
           </div>
       </div>
        <div class="travererList">
            <div class="oneTraverer" v-for="tra in travelers">

                    <span class="chooseTravelIcon">
                        <img src="../../../static/img/select_gray.png" alt="">
                    </span>
                    <span class="travelInfo">
                        <div>
                            {{tra.name}}
                        </div>
                        <div style="color: #bbb">
                            身份证
                        </div>
                        <div>
                            {{tra.identityCard}}
                        </div>
                    </span>
                    <span class="alterTravel"><img src="../../../static/img/alter_travel.png" alt="" @click="editTralver(tra)" ></span>

            </div>
            <div class="bottomLine">
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
  export default {
    data() {
      return {
        travelers:[],
        selectedTraveler:{}

      }
  },
  mounted(){
      if(!isWebchat()){
        login()
      }
      let url = 'https://app.playnet.cc/index/assist/get_contacts/wjkey/' + localStorage.key
      log(url)
      let that = this
      axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
               that.travelers = res.data
               
            }
            else{
                
            }
        })
        
  },
  methods:{
      addTraveler(){
           this.$router.push({ name: 'wbAddTraveler'})
      },
      editTralver(tra){
          this.$store.commit('setEditPeople', tra)
          this.$router.push({ name: 'wbAddTraveler'})
      }
    
  },
}
</script>
<style>
    .wbTravelerMain{
        
        font-size: 0.5rem;
    }
   .addTraveler{
       text-align: center;
       
   }
   .addTraveler button{
       font-size: 0.45rem;
       color: red;
       background: white;
       width: 86%;
       border: 0px;
       margin: 0.2rem 0.2rem;
       padding: 0.1rem 0.1rem;
   }
   .travererList{
       margin-top: 0.2rem;
   }
    .oneTraverer{
        display: flex;
        height: 2.2rem;
        
        background: white;
        font-size: 0.4rem;
        border-bottom: 1px solid #ddd;
        
    }
    .bottomLine{
        height: 0.2rem;
        background: white;
    }
    .chooseTravelIcon{
        width: 10%;
        text-align: center;
      
    }
    
    .chooseTravelIcon img{
        width: 0.5rem;
        margin-top: 0.07rem;
        margin-top: 0.2rem;
    }
    .travelInfo{
        width: 75%;
        margin-top: 0.15rem;
    }


    .alterTravel{
        width: 15%;
        text-align: center;
        border-left: 1px solid #ddd;
        line-height: 2.5rem;
    }
    .alterTravel img{
        width: 0.6rem;
       
    }
</style>