<template>
    <div class="wbTravelerMain">
       <div>
           <div>
               添加出行人
           </div>
       </div>
        <div>
            <div v-for="tra in travelers">
                <div>
                    <span>
                        <img src="" alt="">
                    </span>
                    <span>
                        <div>
                            {{tra.name}}
                        </div>
                        <div>
                            身份证
                        </div>
                        <div>
                            {{tra.identityCard}}
                        </div>
                    </span>
                </div>
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
      
    
  },
}
</script>
<style>
    .wbTravelerMain{
        background: white;
        font-size: 0.5rem;
    }
</style>