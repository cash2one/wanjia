<template>
    <div>
         <div class="qus1">
           <div class="qusTitle" >1. 你喜欢玩+哪个频道</div>
           <div class="qusContent">
               <div><input type="radio"  value="预定" id="chanle1" v-model="chanle"> <label for="chanle1" >预定</label> </div>
               <div><input type="radio"  value="学院" id="chanle2"  v-model="chanle"> <label for="chanle2" >学院</label></div>
               <div><input type="radio"  value="玩+圈" id="chanle3" v-model="chanle"> <label for="chanle3" >玩+圈</label></div>
           </div>
       </div>
     
      <div class="qus1">
           <div class="qusTitle" >2. 你是怎样了解玩+APP?</div>
           <div class="qusContent">
               <div><input type="radio"  id="howToKnow1" v-model="howToKnow" value="朋友推荐后下载"><label for="howToKnow1" >朋友推荐后下载</label> </div>
               <div><input type="radio"  id="howToKnow2" v-model="howToKnow" value="网上获取后下载使用"><label for="howToKnow2" >网上获取后下载使用</label></div>
               <div><input type="radio"  id="howToKnow3" v-model="howToKnow" value="不知道怎么获取的"><label for="howToKnow3">不知道怎么获取的</label></div>
               <div><input type="radio"  id="howToKnow4" v-model="howToKnow" value="其他"><label for="howToKnow4" >其他</label></div>
           </div>
       </div>


         <div class="qus1">
             <div class="qusTitle" >5. 请你对玩+提出宝贵的意见</div>
           <textarea class="wanjiaAdvise" v-model="advise" ></textarea>
        </div>

         <div class="qus1">
           <div class="qusTitle" >6. 你的出生年代</div>
           <div class="qusContent qusContentAge">
               <div><input type="radio"  value="60后" v-model="age" id="age1" ><label for="age1">60后</label></div>
               <div><input type="radio"  value="70后"  v-model="age" id="age2"><label for="age2">70后</label></div>
               <div><input type="radio"  value="80后"  v-model="age" id="age3"><label for="age3">80后</label></div>
           </div>
       </div>

         <div class="qus2">
           <span>性别: </span>
           <input type="radio"  v-model="gender" id="gender1" value="男"><label for="gender1">男</label>
           <div><input type="radio"  v-model="gender" id="gender2" value="女"><label for="gender2">女</label></div>

       </div>

         <div class="qus2">
           <span>行业: </span>
           <input type="radio"  value="互联网&IT" v-model="bussiness" id="bussiness1"><label for="bussiness1">互联网&IT</label>
           <div><input type="radio"  value="金融" v-model="bussiness" id="bussiness2"><label for="bussiness2">金融</label></div>
           <div><input type="radio"  value="房地产" v-model="bussiness" id="bussiness3"><label for="bussiness3">房地产</label></div>
           <div><input type="radio"  value="制造" v-model="bussiness" id="bussiness4"><label for="bussiness4">制造</label></div>
       </div>

       <div class="qus3">
           <button id='sub' @click="submit" type="">提交</button>
       </div>
    </div>
</template>
<script>
import qs from 'qs'
import axios from 'axios'
 export default {
    data() {
      return {
         chanle:'',
         howToKnow:'',
         advise:'',
         age:'',
         gender:'',
         bussiness:''
      }
    },
    methods:{
        submit(){
            if(this.chanle == ''){
                toast(this,'你没有选择频道')
                return
            }
            if(this.howToKnow == ''){
                toast(this,'你没有选择怎么了解玩+APP')
                return
            }
            if(this.advise == ''){
                toast(this,'请写宝贵意见')
                return
            }
            if(this.age == ''){
                toast(this,'你没有选择出生年代')
                return
            }
            if(this.gender == ''){
                toast(this,'你没有选择性别')
                return
            }
            if(this.bussiness == ''){
                toast(this,'你没有选择行业')
                return
            }
            let data = {
                chanle:this.chanle,
                howToKnow:this.howToKnow,
                advise:this.advise,
                age:this.age,
                gender:this.gender,
                bussiness:this.bussiness
            }

            // axios.post('url',qs.stringify(data))

        }
    }
    
   }
</script>
<style>


div.qus1{
    padding: 0.5rem 1rem;
    padding-bottom: 0rem;
}
div.qus1 input{
    width: 0.6rem;
    height: 0.6rem;
    vertical-align: middle;
    margin-right: 0.2rem
}
div.qus1 label{
    vertical-align: middle;
}
div.qusContent{
    padding-left: 0.4rem;
}
div.qusContent div{
    padding-top: 0.25rem;
}

textarea.wanjiaAdvise{
    width: 90%;
    height: 1.6rem;
    resize: none;
    margin: 0.3rem 0.5rem;
    border: 1px solid #c4c3c3;
    padding: 0.2rem;
    font-size: 0.9rem;
}
div.qusContentAge{
    padding-left: 1.75rem;
}
div.qus2{
     padding: 0.6rem 1rem;
}
div.qus2 input{
    width: 0.6rem;
    height: 0.6rem;
    vertical-align: middle;
    margin-right: 0.2rem;
}
div.qus2 span{
    vertical-align: middle;
   
}
div.qus2 div{
     margin-left: 2.57rem;
     margin-top: 0.2rem;
}
div.qus3{
    margin: 0.6rem 0rem;
    padding: 0.3rem 0rem;
    text-align: center;
}
div.qus3 button{
    border-radius: 0.2rem;
    background: #ff6634;
    border: 0px;
    width: 90%;
    height: 1.5rem;
    color: white;
    font-size: 0.8rem;
}
</style>