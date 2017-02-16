<template>
  <div>
    <div>
      <mt-header fixted class="mainHead" title="玩+" >
          <mt-button slot="left" style="font-size: 0.5rem !important" >深圳</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore">
    <div class="indexPage"   >
      
      <swiper :options="swiperOption" class="swiper-box-main headSwiper">
          <swiper-slide class="swiper-item" v-for="baner in pageData.banner">
              <img style="width: 100%;height: 8rem;" :src="baner.imagePath" @click="gotoAd(baner)">
          </swiper-slide>
          <div class="swiper-pagination" style="line-height: 0.7rem;bottom: 1px;height: 1rem;background: #383f49" slot="pagination"></div>
      </swiper>
      <div class="wanplustoutiaoDiv">
        <img class="wanplusToutiao" src="../../main/wanplustoutiao.png" alt="">
        <div class="scrollAd">
              <marquee class="scrollAdMarquee"  :msgs = "marquees" @click='click' ></marquee>
        </div>
      </div>
      <div class="productCatDiv">
        <div class="fourCatDic">
           <div v-for="cat in pageData.ad_category" @click="gotoProductList(cat)">
             <img :src="cat.adImage" alt="">
             <span style="display: block;font-size: 0.36rem">{{cat.adText}}</span>
           </div>
        </div>
        <div class="twoCatDic">
          <img :src="car.adImage" v-for="car in pageData.ad_mall_finance" alt="" @click="gotoAd(car)">
        </div>
      </div>
      <div class="newProductsDiv">
         <img class="imgTitle" src="../../main/new.png" alt="">
         <div class="catImageDiv">
            <img  :src="cat.adImage" v-for="cat in pageData.ad_new" alt="" @click="gotoAd(cat)" >
         </div>
      </div>
      <div class="newProductsDiv">
          <img class="imgTitle" src="../../main/recommend.png" alt="">
          <img class="imgBigCat" :src="recommendBigImg.adImage" alt="">
         <div class="catImageDiv">
            <img  :src="cat.adImage" v-for="cat in recommendSmallImages" alt="" @click="gotoAd(cat)">
         </div>
      </div>
       <div class="newProductsDiv">
          <img class="imgTitle" src="../../main/popular.png" alt="">
          <img class="imgBigCat" :src="popularBigImage.adImage" alt="">
         <div class="catImageDiv">
            <img  :src="cat.adImage" v-for="cat in popularSmallImage" alt="" @click="gotoAd(cat)">
         </div>
      </div>
       <div class="newProductsDiv">
          <img class="imgTitle" src="../../main/custom.png" alt="">
          <img class="imgBigCat" :src="customBigImage.adImage" alt="">
         <div class="catImageDiv">
            <img  :src="cat.adImage" v-for="cat in customSmallImage" alt="" @click="gotoAd(cat)">
         </div>
      </div>
      <div class="hotProject">
         <div>
           <img src="../../main/hot.png" style="height: 0.6rem;margin: 0.3rem 0.3rem;" alt="">
         </div>
         <div class="hotProjects">
           <div class="hotProjectItem" v-for="pro in hotProjects" @click="gotoProduct(pro.id)">
              <img :src="pro.goodsThumb" alt="">
              <div>
                {{pro.goodsName}}
              </div>
              <span class="productZan"> <img src="../../main/like.png" alt=""> <span style="vertical-align: middle">{{pro.zan}}</span> </span>
           </div>
           <div style="clear: both"></div>
         </div>
      </div>
    </div>
    </mt-loadmore>
  <openApp class="topOpenApp"></openApp>
    </div>
</template>
<script>
 import Vue from 'vue'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
 import { Toast } from 'mint-ui'
 import 'mint-ui/lib/toast/style.css'
 import axios from 'axios'
 import marquee from '../../../components/marquee.vue'
import openApp from '../../../components/openApp.vue'
 export default{
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 5,
          mousewheelControl: true,
          autoplay: 3000,
          loop:true,
        },
        allLoaded:false,
        pageData:{},
        recommendBigImg:{},
        recommendSmallImages:{},
        popularBigImage:{},
        popularSmallImage:{},
        customBigImage:{},
        customSmallImage:{},
        hotProjects:{},
        pageIndex:0,
        marquees:[],
      }
    },
    mounted(){
     // let url = "http://localhost:8880/index/index/index?page=" + this.pageIndex
      let url = "https://app.playnet.cc/index/index/index?page=" + this.pageIndex
      axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
                this.pageIndex ++ 
                console.log(this.pageIndex)
                this.pageData = res.data
                this.hotProjects = this.pageData.product
                this.recommendBigImg = this.pageData.ad_recommend[0]
                this.recommendSmallImages = this.pageData.ad_recommend.splice(1,3)
                this.popularBigImage = this.pageData.ad_popular[0]
                this.popularSmallImage = this.pageData.ad_popular.splice(1,3)
                this.customBigImage = this.pageData.ad_custom[0]
                this.customSmallImage = this.pageData.ad_custom.splice(1,3)
                this.marquees = res.data.ad_marquee
            }
            else{
                
            }
        })
    },
     components: {
        swiper,
        swiperSlide,
        marquee,
        openApp
    },
    methods:{
      loadBottom(id){
        return
        this.$refs.loadmore.onBottomLoaded();
        console.log('load more')
        this.allLoaded = true
        console.log(this.pageIndex)
        //let url = "http://localhost:8880/index/index/index?page=" + this.pageIndex
        let url = "https://app.playnet.cc/index/index/index?page=" + this.pageIndex
        console.log('首页url:' + url)
        axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
              this.pageIndex ++ 
              this.allLoaded = false
               this.hotProjects = this.hotProjects.concat(res.data)
            }
            else{
                this.allLoaded = true
                this.toast('已经全部加载完')
            }
        })
      },
      gotoAd(adInfo){
        console.log(adInfo)
        if(adInfo.type == 1){
          this.gotoProduct(adInfo.id)
        }
        else{
          this.$store.commit('setWebUrl', adInfo.adUrl)
          this.$router.push({ name: 'webchatWeb'})
        }
      },
      gotoProduct(id){
        this.$router.push({ name: 'product', params: { id:id }})
      },
      gotoProductList(type){
        console.log(type)
         this.$router.push({ name: 'webchatProductList', params: { type:type.id - 3 }})
      },
      click(msg){
        this.$store.commit('setWebUrl', msg.url)
        this.$router.push({ name: 'webchatWeb'})
      },
      toast(msg){
             Toast({
                message: msg,
                position: 'bottom',
                duration: 2000
            })
      }
    }
 }
</script>
<style>
  .topOpenApp{
    top: 0px;
    z-index: 100;
    height: 1.5rem;
  }
</style>