<template>
    <div class="mainOrderListDiv">
       <div class="productsTitle">
           
            <mt-navbar v-model="selected">
                 <mt-tab-item class="productCatTitle" id="0" >全部</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="1" >待付款</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="2" >待使用</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="3" >待评价</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="4" >退款/售后</mt-tab-item>
            </mt-navbar>
         
       </div>
      
        <mt-tab-container   class="orderContainer" v-model="selected">
            <mt-tab-container-item id="0">
                <div v-for="or in orders" >
                    <div class="orderMainDiv" @click="orderInfo(or)">
                        <img class="orderProductImg" :src="or.goodsThumb" alt="">

                        <div class="orderProductInfo">
                            <div>
                                {{or.goodsName}}
                            </div >
                            <div class="orderProductPrice">
                                数量: {{or.goodsNums}}
                            </div>
                            <div class="orderProductPrice">
                                总价: ￥{{or.orderAmount}}
                            </div>
                        </div>
                        <div class="orderProductStatus">
                            <span>{{getStatus(or.status)}}</span>

                            <button class="orderProductHandleButton">{{getStatusHandle(or.status)}}</button>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>


            <mt-tab-container-item id="1">
                <div v-for="or in pendingPayOrders" >
                    <div class="orderMainDiv">
                        <img class="orderProductImg" :src="or.goodsThumb" alt="">

                        <div class="orderProductInfo">
                            <div>
                                {{or.goodsName}}
                            </div >
                            <div class="orderProductPrice">
                                数量: {{or.goodsNums}}
                            </div>
                            <div class="orderProductPrice">
                                总价: ￥{{or.orderAmount}}
                            </div>
                        </div>
                        <div class="orderProductStatus">
                            <span>{{getStatus(or.status)}}</span>

                            <button class="orderProductHandleButton">{{getStatusHandle(or.status)}}</button>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>


             <mt-tab-container-item id="2">
                <div v-for="or in pendingUseOrders" >
                    <div class="orderMainDiv">
                        <img class="orderProductImg" :src="or.goodsThumb" alt="">

                        <div class="orderProductInfo">
                            <div>
                                {{or.goodsName}}
                            </div >
                            <div class="orderProductPrice">
                                数量: {{or.goodsNums}}
                            </div>
                            <div class="orderProductPrice">
                                总价: ￥{{or.orderAmount}}
                            </div>
                        </div>
                        <div class="orderProductStatus">
                            <span>{{getStatus(or.status)}}</span>

                            <button class="orderProductHandleButton">{{getStatusHandle(or.status)}}</button>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>

           <mt-tab-container-item id="3">
                <div v-for="or in pendingCommentOrders" >
                    <div class="orderMainDiv">
                        <img class="orderProductImg" :src="or.goodsThumb" alt="">

                        <div class="orderProductInfo">
                            <div>
                                {{or.goodsName}}
                            </div >
                            <div class="orderProductPrice">
                                数量: {{or.goodsNums}}
                            </div>
                            <div class="orderProductPrice">
                                总价: ￥{{or.orderAmount}}
                            </div>
                        </div>
                        <div class="orderProductStatus">
                            <span>{{getStatus(or.status)}}</span>

                            <button class="orderProductHandleButton">{{getStatusHandle(or.status)}}</button>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>

        
           <mt-tab-container-item id="4">
                <div v-for="or in refundOrders" >
                    <div class="orderMainDiv">
                        <img class="orderProductImg" :src="or.goodsThumb" alt="">

                        <div class="orderProductInfo">
                            <div>
                                {{or.goodsName}}
                            </div >
                            <div class="orderProductPrice">
                                数量: {{or.goodsNums}}
                            </div>
                            <div class="orderProductPrice">
                                总价: ￥{{or.orderAmount}}
                            </div>
                        </div>
                        <div class="orderProductStatus">
                            <span>{{getStatus(or.status)}}</span>

                            <button @click="orderhandle(or)" class="orderProductHandleButton">{{getStatusHandle(or.status)}}</button>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
// import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        selected:'0',
        orders:[],
        pendingPayOrders:[],
        pendingUseOrders:[],
        pendingCommentOrders:[],
        refundOrders:[]
      }
  },
  mounted(){
    if(!isWebchat()){
        login()
    }
    let ordersDiv = document.getElementsByClassName('mainOrderListDiv')[0]
    ordersDiv.style.height = (screen.height ) + 'px'
    let url = 'https://app.playnet.cc/index/order/index/wjkey/' + localStorage.key
    log(url)
    var that = this
    axios.get(url).then(response=>{
        var res = response.data;
        if(res.ret_code == 0) {
            that.orders = res.data
            let temp = []
            for(var t of that.orders){
                if(t.status == 0)
                temp.push(t)
            }
            
            that.pendingPayOrders = temp
            temp = []
            for(var t of that.orders){
                if(t.status == 2)
                temp.push(t)
            }
            that.pendingUseOrders = temp

            temp = []
            for(var t of that.orders){
                if(t.status == 4)
                temp.push(t)
            }
            that.pendingCommentOrders = temp

           temp = []
            for(var t of that.orders){
                if(t.status == 7 || t.status == 8)
                temp.push(t)
            }
            that.refundOrders = temp

            
        }
        else{
            
        }
    })
  },
  methods:{
      getStatus(status){
        switch (status) {
            case 0:
                return '待付款'
                break;
            case 1:
                return '待确认'
                break;
            case 2:
                return '待使用'
                break;
            case 3:
                return '支付失败'
                break;
            case 4:
                return '待评价'
                break;
            case 5:
                return '完成'
                break;
            case 6:
                return '已关闭'
                break;
            case 7:
                return '退款中'
                break;
            case 8:
                return '已退款'
                break;
            default:
                break;
        }
      },
      getStatusHandle(status){
        switch (status) {
            case 0:
                return '付款'
                break;
            case 1:
                return '查看'
                break;
            case 2:
                return '查看'
                break;
            case 3:
                return '查看'
                break;
            case 4:
                return '评价'
                break;
            case 5:
                return '查看'
                break;
            case 6:
                return '查看'
                break;
            case 7:
                return '查看'
                break;
            case 8:
                return '查看'
                break;
            default:
                break;
        }
      },
      orderInfo(order){
           this.$router.push({ name: 'wbOrderInfo', params: { id:order.id }})
      },
      orderhandle(order){
         switch (order.status) {
             case 0:
                 this.$router.push({ name: 'wbPayOrder', params: { id:order.id }})
                 break;
         
             default:
                 break;
         }
      }
     
      
  },
  
  watch:{
      selected:function(val){
        
      }
  }
  // props: ['selected']
}
</script>
<style>
    .orderMainDiv{
        display: flex;
        padding-top: 0.4rem;
        padding-bottom: 0.3rem;
        padding-left: 0.4rem;
        padding-right: 0.2rem;
        border-bottom: 1px solid #ddd;
    }
   .mainOrderListDiv{

   }
    .orderContainer{
        margin-top: 0.1rem;
        /*position: absolute;*/
        top: 1.6rem;
        z-index: 1;
        background: white;
        font-size: 0.43rem;
    }
    .orderProductImg{
        width: 1.8rem;
        height: 1.8rem;
        margin-right: 0.3rem;
    }
    .orderProductInfo{
        margin-top: -0.1rem;
        width: 70%;
    }
    .orderProductPrice{
        color: #aaa;
        font-size: 0.4rem
    }
    .orderProductStatus{
        font-size: 0.37rem;
        text-align: right;
        position: relative;
        width: 2rem;
        color: green;
    }
    .orderProductHandleButton{
        bottom: 0.1rem;
        border: 1px solid orange;
        background: white;
        width: 2.2rem;
        right: 0rem;
        border-radius: 0.1rem;
        padding: 0.1rem 0rem;
        position: absolute;
        color: orange
    }
</style>