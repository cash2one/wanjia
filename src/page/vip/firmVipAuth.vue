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
            <img src = "http://img1.gamersky.com/image2017/01/20170114_zl_91_12/gamersky_05origin_09_201711416316C2.jpg" alt=""></ie>
        </div>
    </div>
</template>
<script>
    import {validate} from '../../tool/tool'

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
                console.log(data.msg)
                 this.$vux.toast.show({
                   text: '公司单位名称不能为空',
                   position:"bottom",
                   type:'text'
                })
                return
            }
            let dict = {
                name:this.name,
                phone:this.phone,
                compony:this.companyName
            }
            
            this.$router.push('firmApplied')

           
        },
    }
   }
</script>
<style>
div.applyVipSuccessMainDiv{
    text-align: center;
    
}
div.whyVIP{
    font-size: 0.8rem;
    color: orangered;
    padding-top: 0.5rem;
    padding-bottom: 0.1rem;
}
div.vipReason ul{
    margin-left: 3.5rem;
    font-size: 0.6rem;
    list-style: none;
    color: #666;
}
div.vipReason ul li{
    text-align: left;
}
input.applyInput{
    margin-top: 0.7rem;
    width: 70%;
    border: 1px solid #888;
    height: 1.3rem;
    border-radius: 0.2rem;
    font-size: 0.55rem;
    color: #999;
    padding-left: 0.3rem;
}
button.applyButton{
     margin-top: 0.8rem;
    height: 1.3rem;
    background: orangered;
    border: 0px;
    border-radius: 0.2rem;
    width: 75%;
    color: white;
    font-size: 0.7rem;
}
div.imgVipAuth img{
margin-top: 2rem;
 width: 100%;
}
</style>