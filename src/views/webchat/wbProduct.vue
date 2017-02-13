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
           <img class="productLocationImg" src="../product/btn_address.png" alt="">
           <span>{{address.address}}</span>
           <img  class="productPhoneImg" src="../product/btn_phone.png" alt="">
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

       
       <button class="btn_order" >开始预定</button>


    </div>
</template>
<script>
 import Vue from 'vue'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
 import productInfo from '../../model/productInfo'
 import openApp from '../../components/openApp.vue'
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
         openApp:function(){
             var ifr = document.createElement('iframe'); 
                ifr.src = 'wanjia://'; 
                ifr.style.display = 'none'; 
                document.body.appendChild(ifr); 
                console.log(ifr)
                window.setTimeout(function(){ 
                  document.body.removeChild(ifr); 
                },3000) 
          
         },
         checkDetail(){
             this.$router.push({ name: 'webView'})
         }
    },
    components: {
        swiper,
        swiperSlide,
        openApp
    }
  }
</script>

<style>
  html,body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
  }
  .swiper-box {
    width: 100%;
    height: 9rem;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
div.swiper-pagination{
    opacity: 0.7;
}
div.swiper-pagination span{
    background: white;
}
div.productNum{
    position: absolute;
    right: 0.3rem;
    top: 8.1rem;
    z-index: 100;
    font-size: 0.35rem;
    color: white;
    padding: 0.2rem 0rem;
}
div.productTitleInfo{
    text-align: center;
    background: white;
}
div.productTitle{
    font-size: 0.4rem;
    padding: 0.1rem;
    /* background: white; */
}
div.productPrice{
    color: #fe6734;
}
div.productService{
    background: white;
    margin-top: 0.15rem;
}
div.productServiceTitle{
    font-size: 0.45rem;
    padding: 0.3rem;
    color: #444444;
}
div.productServiceList{
    margin:0.1rem 0rem;
    display: flex;
    overflow: scroll;

}
span.selectedService{
    color:#14CC81;
}
div.productServiceList span{
    font-size: 0.37rem;
    display: block;
    text-align: center;
    margin-left: 0.15rem;
    margin-bottom: 0.1rem;
    width: 2rem;
}
div.productServiceList span span{
    margin-left: 0rem;
}
div.productLocation{
    margin-top: 0.15rem;
    background: white;
    font-size: 0.4rem;
    line-height: 1rem;
}
img.productLocationImg{
    width: 0.3rem;
    padding-left: 0.3rem;
    float: left;
    padding-right: 0.2rem;
    padding-top: 0.25rem;
}
img.productPhoneImg{
    width: 0.4rem;
    float: right;
    padding-right: 0.3rem;
    padding-top: 0.3rem;
}
div.openAppDiv{
    position: fixed;
    bottom: 0px;
    background: #ffffff;
    opacity: 0.8;
    width: 100%;
}
img.imgLogo{
    height: 1rem;
    margin-left: 0.4rem;
    margin-top: 0.2rem;
}
button.btnOpenApp{
    background: #fe6734;
    color: white;
    font-size: 0.3rem;
    border-radius: 0.1rem;
    border: 0px;
    padding: 0.2rem 0.25rem;
    float: right;
    margin: 0.3rem 0.3rem;
}
div.commentDiv{
    font-size: 0.4rem;
    background: white;
    margin-top: 0.15rem;
    margin-bottom: 0.5rem;
}
div.customComment{
    padding-top: 0.1rem;
    padding-left: 0.2rem;
}
span.allComment{
    padding-left: 0.2rem;
}
span.allScore{
    float: right;
    padding-right: 0.2rem;
    color: #c40000;
}
div.commentTag{
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    border-top: 1px solid #aaa;
    margin-top: 0.1rem;
    padding-top: 0.25rem;
}
div.commentTag span{
    background: #eee;
    padding: 0.1rem;
    border-radius: 0.1rem;
    display:inline-block;
    margin-bottom: 0.2rem;
    margin-right: 0.1rem;
}
.btn_order{
    width: 100%;
    background: orangered;
    height: 1rem;
    color: white;
    font-size: 0.4rem;
    border: 0px;
}
</style>