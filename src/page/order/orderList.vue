<template>
    <div class="mainOrderListDiv">
       <div class="ordersTitle">
            <tab :line-width=2 active-color='#fc378c' v-model="index">
                <tab-item class="productCatTitle"  :selected="index == 0" @click="index = 0" >全部</tab-item>
                <tab-item class="productCatTitle"  :selected="index == 1" @click="index = 1" >待付款</tab-item>
                <tab-item class="productCatTitle"  :selected="index == 2" @click="index = 2" >待使用</tab-item>
                <tab-item class="productCatTitle"  :selected="index == 3" @click="index = 3" >待评价</tab-item>
                <tab-item class="productCatTitle"  :selected="index == 4" @click="index = 4" >退款/售后</tab-item>
            </tab>
       </div>

 
        <div class="orderContainer" id="Container1" >
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
        </div>
    

         
        <div class="orderContainer" id="Container2" style="display: none">
            <div v-for="or in pendingPayOrders" >
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
        </div>
          

        <div class="orderContainer" id="Container3" style="display: none">
            <div v-for="or in pendingUseOrders" >
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
        </div>
           

           
        <div class="orderContainer" id="Container4" style="display: none">
            <div v-for="or in pendingCommentOrders" >
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
        </div>
         

         
        <div class="orderContainer" id="Container5" style="display: none">
            <div v-for="or in refundOrders" >
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
        </div>


    </div>
</template>
<script>

import { Tab, TabItem,Swiper, SwiperItem} from 'vux'
import {getOrderList} from '../../store/service'
  export default {
    data() {
      return {
        index:0,
        orders:[],
        pendingPayOrders:[],
        pendingUseOrders:[],
        pendingCommentOrders:[],
        refundOrders:[]
      }
  },
  props: ['isShow'],
  mounted(){
    if(!isWebchat()){
        login()
    }
    this.loadData();
    
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
           this.$router.push({ name: 'orderInfo', params: { id:order.id }})
      },
      orderhandle(order){
         switch (order.status) {
             case 0:
                 this.$router.push({ name: 'wbPayOrder', params: { id:order.id }})
                 break;
         
             default:
                 break;
         }
      },
      loadData(){
        var that = this
        getOrderList().then(function(data){
            that.orders = data.data
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
        },function(error){
            console.log(data.msg)
            this.$vux.toast.show({
                text: '网络错误，请重新再试',
                position:"bottom",
                type:'text'
            })
        })
      },
      switchOrder(index){
          for(var i =1;i<6;i++){
              document.getElementById('Container' + i).style.display = 'none'
          }
           document.getElementById('Container' + (index + 1)).style.display = 'inherit'
      }
  },
  
  watch:{
      index:function(val){
        this.switchOrder(val);
      },
      isShow:function(val){
        //   console.log('isShow' + val)
      }
  },
  components:{
      Tab, TabItem,Swiper, SwiperItem
  }
}
</script>
<style>
    .orderMainDiv{
        display: flex;
        padding-top: 0.5rem;
        padding-bottom: 0.4rem;
        padding-left: 0.5rem;
        padding-right: 0.3rem;
        border-bottom: 1px solid #ddd;
    }
   .mainOrderListDiv{

   }
   .ordersTitle{
       position: fixed;
       width: 100%;
   }

    .orderContainer{
        margin-top: 0.1rem;
        position: absolute;
        top: 1.6rem;
        z-index: 1;
        background: white;
        font-size: 0.43rem;
        width: 100%;
        top: 2rem;

    }
    .orderProductImg{
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 0.3rem;
    }
    .orderProductInfo{
        margin-top: -0.1rem;
        width: 70%;
        font-size: 0.6rem;
    }
    .orderProductPrice{
        color: #aaa;
        font-size: 0.5rem
    }
    .orderProductStatus{
        font-size: 0.5rem;
        text-align: right;
        position: relative;
        width: 2rem;
        color: green;
    }
    .orderProductHandleButton{
        bottom: 0.1rem;
        border: 1px solid orange;
        background: white;
        width: 2.5rem;
        right: 0rem;
        border-radius: 0.1rem;
        padding: 0.15rem 0rem;
        position: absolute;
        color: orange
    }
</style>