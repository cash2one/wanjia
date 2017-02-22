<template>
    <div class="mainProductListDiv">
       <div class="productsTitle">
           
            <mt-navbar v-model="selected">
                 <mt-tab-item class="productCatTitle" id="0" >全部</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="1" >待付款</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="2" >待使用</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="3" >待评价</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="4" >退款/售后</mt-tab-item>
            </mt-navbar>
         
       </div>
      
        <mt-tab-container  class="orderContainer"  v-model="selected">
            <mt-tab-container-item id="0">
                <mt-cell v-for="or in orders" >
                    <div class="orderMainDiv">
                        <img class="orderProductImg" :src="or.goodsThumb" alt="">

                        <div>
                            <div>
                                {{or.goodsName}}
                            </div>
                            <div>
                                数量: {{or.goodsNums}}
                            </div>
                            <div>
                                总价: ￥{{or.orderAmount}}
                            </div>
                        </div>
                    </div>
                </mt-cell>
            </mt-tab-container-item>


            <mt-tab-container-item id="1">
                <div class="catProductList">
                     
                </div>
                <mt-cell   >
                    
                </mt-cell>
            </mt-tab-container-item>


             <mt-tab-container-item id="2">
                
                <mt-cell  >
                   
                </mt-cell>
            </mt-tab-container-item>

             <mt-tab-container-item id="3">
                <div class="catProductList">
                    
                </div>
                <mt-cell   >
                  
                </mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <div class="catProductList">
                    
                </div>
                <mt-cell >
                  
                </mt-cell>
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
      }
  },
  mounted(){
    if(!isWebchat()){
        login()
    }
    let url = 'https://app.playnet.cc/index/order/index/wjkey/' + localStorage.key
    log(url)
    var that = this
    axios.get(url).then(response=>{
        var res = response.data;
        if(res.ret_code == 0) {
            that.orders = res.data
        }
        else{
            
        }
    })
  },
  methods:{
      
     
      
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
    }
    .orderContainer{
        
    }
    .orderProductImg{
        width: 1rem;
        height: 1rem;
    }
</style>