<template>
    <div style="font-size: 0.5rem;">
        <div class="orderProductDetail">
            <img  :src="orderInfo.goodsThumb" alt="">
            <div class="orderProductInfoDetail">
                 <div>
                    {{orderInfo.goodsName}}
                </div>
                <div class="orderProductInfoDetails">数量: {{orderInfo.goodsNums}}</div>
                <div class="orderProductInfoDetails">总价: {{orderInfo.orderAmount}}</div>
            </div>
        </div>
       
       <div class="wbproductPay" style="padding-bottom: 0.2rem;">
            <div>
                选择支付方式
            </div>

            <div class="wbPayWay">
                <img src="./webchat.jpeg" alt="">
                <span>微信支付</span>
                <input type="radio" checked="checked"  >
            </div>

        </div>
        <div style="text-align: center;margin-top: 1rem;">
            <button  class="btnCheckDetail" type="" >确认支付 ￥{{orderInfo.orderAmount}}</button>
        </div>
        
       
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
import axios from 'axios'
 export default{
    data() {
      return {
        orderInfo:{},
        
      }
    },
    mounted(){
       if(!isWebchat()){
        login()
       }
       let id = this.$route.params.id
       let url = 'https://app.playnet.cc/index/order/detail/wjkey/' + localStorage.key +"/id/"  + id
       log(url)
       let that = this
       axios.get(url).then(response=>{
        var res = response.data;
        if(res.ret_code == 0) {
            that.orderInfo = res.data
        }
        else{
            
        }
    })

    },   
    components:{
     
    },
    methods:{
       
    },
  
 }
</script>
<style>

</style>