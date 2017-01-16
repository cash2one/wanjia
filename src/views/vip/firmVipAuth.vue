<template>
    <div class="applyVipSuccessMainDiv">
        <div class="whyVIP">
            成为玩+白金VIP三大理由
        </div>
        <div class="vipReason">
           <ul>
               <li> <span> · </span>  参与高端精英圈层</li>
               <li><span> · </span> 白金专享产品</li>
               <li><span> · </span> 更优惠的价格</li>
           </ul>
        </div>
      
        <input class="applyInput" type="text" name="" v-model="name" placeholder="真实姓名" >
        <input class="applyInput" type="text" name="" v-model="phone" placeholder="请输入你的手机号">
        <input class="applyInput" type="text" name="" v-model="companyName" placeholder="请输入公司单位名称">
        <button class="applyButton" @click="submitApply" type="">提 交</button>
        <div class="imgVipAuth">
            <img src = "http://d.5857.com/mgqs_161124/001.jpg" alt=""></ie>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import {validate} from '../../tool/tool'
    import 'mint-ui/lib/toast/style.css'
    export default {
    data() {
      return {
         name:"",
         phone:"",
         companyName:""
      }
    },
    mounted(){
    },
    methods:{
        submitApply(){
            
            let nameResult =  validate('realName',this.name)
            if(nameResult){
                this.toast(nameResult)
                return
            }
            let phoneResult =  validate('phone',this.phone)
            if(phoneResult){
                this.toast(phoneResult)
                return
            }
            if(!/\S+/.test(this.companyName)){
                this.toast('公司单位名称不能为空')
                return
            }
            let dict = {
                name:this.name,
                phone:this.phone,
                compony:this.companyName
            }
            
            this.$router.push('firmApplied')

           
        },
        toast(msg){
             Toast({
                message: msg,
                position: 'bottom',
                duration: 10000
            })
        }
    }
   }
</script>
<style>
div.applyVipSuccessMainDiv{
    text-align: center;
    font-size: 0.5rem;
}
div.whyVIP{
    font-size: 0.5rem;
    color: orangered;
    padding-top: 0.5rem;
    padding-bottom: 0.1rem;
}
div.vipReason ul{
    margin-left: 3.5rem;
    font-size: 0.4rem;
    list-style: none;
    color: #666;
}
div.vipReason ul li{
    text-align: left;
}
input.applyInput{
    margin-top: 0.4rem;
    width: 70%;
    border: 1px solid #888;
    height: 1rem;
    border-radius: 0.2rem;
    font-size: 0.38rem;
    color: #999;
    padding-left: 0.3rem;
}
button.applyButton{
     margin-top: 0.4rem;
    height: 1rem;
    background: orangered;
    border: 0px;
    border-radius: 0.2rem;
    width: 75%;
    color: white;
    font-size: 0.4rem;
}
div.imgVipAuth img{
margin-top: 2rem;
 width: 100%;
}
</style>