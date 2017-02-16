<template>
    <div class="productImg">
        <swiper :options="swiperOption" class="swiper-box">
            <swiper-slide class="swiper-item" v-for="img in product.goodsImg">
                <img style="width: 100%;height: 9rem;" :src="img.pic">
            </swiper-slide>
            <div class="swiper-pagination" style="line-height: 0.7rem;bottom: 1px;height: 1rem;background: #383f49" slot="pagination"></div>
       </swiper>
       <div class="productNum" >产品编号{{product.goodsCode}}</div>
       <div class="productTitleInfo">
           <div class="productTitle">
               {{product.goodsName}}
           </div>
           <div class="productPrice">
               <span style="font-size: 0.4rem">￥</span>
               <span style="font-size: 0.8rem;font-weight: bold">{{product.goodsPrice}}</span>
               <span style="font-size: 0.5rem">/人</span>
           </div>
       </div>

       <div class="productService">
           <div class="productServiceTitle">
               费用包含服务
           </div>
           <div class="productServiceList">
               <span v-for="service in services" @click="serviceClick(service,$event)">
                   <img :src="service.isInclude ?  service.serviceThumbSelect : service.serviceThumb" alt="">
                   <span v-bind:class="{selectedService:service.isInclude}" >{{service.serviceName}}</span>
               </span>
           </div>
       </div>
       <div class="productLocation">
           <img class="productLocationImg" src="../../product/btn_address.png" alt="">
           <span>{{address.address}}</span>
           <img  class="productPhoneImg" src="../../product/btn_phone.png" alt="">
       </div>

       <div class="commentDiv">
           <div class="customComment">
               客户评价
           </div>
           <span class="allComment">
               全部评价: <span>{{product.goodsComments}}</span> 人 
           </span>
           <span class="allScore" >结合评分: <span>{{product.goodsScore}}</span></span>
           
           <div class="commentTag">
               <span v-for="tag in product.goodsTag">
                {{tag.tagName}}   
                </span>
           </div>
       </div>
       <div style="text-align: center">
           <button class="btnCheckDetail" type="" @click="checkDetail">查看商品详情</button>
       </div>


   
    </div>
</template>
<script>
 import Vue from 'vue'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'

 import productInfo from '../../../model/productInfo'

  export default {
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
          mousewheelControl: true
        },
        loading:true,
        product:{},
        services:[],
        address:{},
     
      }
    },
    mounted(){
      
        var that = this
        let id = this.$route.params.id
        this.$store.commit('setWebUrl', 'https://app.playnet.cc/index/goods/content/id/' + id)
        console.log('the url is :' + this.$store.state.webViewUrl)
        productInfo.getProducts(id).then(function(data){
            console.log(data)
                that.product = data.data
                let ser =  that.product.goodsInclude
                for(var s of ser){
                    s.isInclude = true
                    s.mustSelect = true
                }
                document.title = that.product.goodsName
                that.address = that.product.goodsService
                that.services = ser.concat(that.product.goodsAddition)
                that.loading = false
            },function(error){
                console.log(data.msg)
                that.loading = false
            })
        // this.$http.jsonp("https://app.playnet.cc/index/assist/balance").then((response)=>{
        //     console.log(response)
        // }).catch(function(response) {
		//  	console.log(response)
		// })
    },
    methods:{
        serviceClick:function(service,event){
            let index = this.services.indexOf(service)
            console.log(index)
            if(!service.mustSelect){
                service.isInclude = !service.isInclude
            }
            Vue.set(this.services,index,service)  
         },
         
         checkDetail(){
             this.$router.push({ name: 'webView'})
         }
    },
    components: {
        swiper,
        swiperSlide,
        
    }
  }
</script>

<style>

</style>