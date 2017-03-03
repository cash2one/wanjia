<template>
    <div class="wbTravelerMain">
       <div>
           <div class="addTraveler">
              <button type="" @click="addTraveler"><span>+</span>添加出行人</button>
           </div>
       </div>
        <div class="travererList">
            <div class="oneTraverer" v-for="tra in travelers" @click="chooseTravel(tra)" >
                    <span class="chooseTravelIcon">
                        <img class="imgNotChoosed" :id="tarId(tra)" alt="">
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
                    <span class="alterTravel"><img src="static/img/main/alter_travel.png" alt="" @click="editTralver(tra)" ></span>
                    
            </div>
           
        </div>

         <div style="text-align: center">
             <button type="" class="chooseTravelerButton" @click="sure" >确定</button>
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
        selectedTraveler:[]
      }
  },
  mounted(){
      if(!isWebchat()){
        login()
      }
      this.$store.commit('setEditPeople', {})
      let url = 'https://app.playnet.cc/index/assist/get_contacts/wjkey/' + localStorage.key
      let that = this
      axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
               that.travelers = res.data
               //已经选择好的进来就让选择好这一功能暂时不做
            }
            else{
                
            }
        })
        
  },
 components:{
      
  },
  methods:{
      addTraveler(){
           this.$router.push({ name: 'addTraveler'})
      },
      editTralver(tra){
          this.$store.commit('setEditPeople', tra)
          this.$router.push({ name: 'addTraveler'})
      },
      chooseTravel(tra){
        let index = this.selectedTraveler.indexOf(tra)
        let img = document.getElementById('travelerImg' + tra.id)
          if(img.className == 'imgChoosed'){
            img.className = 'imgNotChoosed'
            if(index >= 0){
                this.selectedTraveler.splice(index,1)
            }
          }
          else{
             img.className = 'imgChoosed'
             if(index < 0){
                this.selectedTraveler.push(tra)
             } 
          }
      },
      tarId(tra){
        return "travelerImg" + tra.id
      },
      sure(){
        if(this.selectedTraveler.length>localStorage.travel){
           // this.toast('你最多只能选择'+localStorage.travel+'名行人')
           // return
        }
        this.$store.commit('setChoosedPeople',this.selectedTraveler)
        log(this.$store.choosedPeople)
        this.$router.back()
      },
     
      
    
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
       font-size: 0.6rem;
       color: red;
       background: white;
       width: 86%;
       border: 0px;
       margin: 0.2rem 0.2rem;
       padding: 0.1rem 0.1rem;
       height: 1rem;
   }
   .travererList{
       margin-top: 0.2rem;
   }
    .oneTraverer{
        display: flex;
        height: 3rem;
        
        background: white;
        font-size: 0.5rem;
        border-bottom: 1px solid #ddd;
        margin-bottom: 0.2rem;
    }
    .imgNotChoosed{
        background-image: url('../../../static/img/main/select_gray.png'); 
    }
    .imgChoosed{
        background-image: url('../../../static/img/main/select_green.png');

        
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
        height: 0.5rem;
        margin-top: 0.5rem;
        background-size: 0.5rem 0.5rem;
    }
    .travelInfo{
        width: 75%;
        margin-top: 0.2rem;
    }
    
      .travelInfo div{
          margin-top: 0.15rem;
      }

    .alterTravel{
        width: 15%;
        text-align: center;
        border-left: 1px solid #ddd;
        line-height: 3rem;
    }
    .alterTravel img{
        width: 0.6rem;
       
    }
    .chooseTravelerButton{
        margin-top: 1rem;
        width: 90%;
        background: orangered;
        color: white;
        height: 1.3rem;
        font-size: 0.6rem;
        border-radius: 0.2rem;
    }
</style>