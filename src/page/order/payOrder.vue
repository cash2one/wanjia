<template>
    <div style="font-size: 0.7rem;">
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
                <img src="static/img/order/webchat.jpeg" alt="">
                <span>微信支付</span>
                <input type="radio" checked="checked"  >
            </div>

        </div>
        <div style="text-align: center;margin-top: 1rem;">
            <button  class="btnPay"  @click = "pay" type="" >确认支付 ￥{{orderInfo.orderAmount}}</button>
        </div>
        
       
    </div>
</template>
<script>
import {getOrderInfo} from '../../store/service'
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
       let that = this
       getOrderInfo(id).then(function(data){ 
            that.orderInfo = data.data
        },function(error)
        {
            console.log(data.msg)
            this.$vux.toast.show({
                text: '网络错误，请重新再试',
                position:"bottom",
                type:'text'
            })
        })

    },   
    components:{
     
    },
    methods:{
       pay(){
           console.log(this.$wechat);
       }
    },
  
 }
</script>
<style>
.wbproductPay{
    margin-top: 0.4rem;
}
.wbPayWay{
    margin-top: 0.4rem;
    background: white;
    padding: 0.3rem 0.8rem;
    vertical-align: middle;
}
.wbPayWay img{
    width: 1.4rem;
    vertical-align: middle;
    margin-right: 0.8rem;
}
.wbPayWay input{
    float: right;
    margin-top: 0.45rem;
}
.btnPay{
    width: 88%;
    background: orange;
    color: white;
    font-size: 0.7rem;
    height: 1.5rem;
    border-radius: 0.1rem;
}
</style>
