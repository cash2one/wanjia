<template>
  <div>
   
    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore" style="margin-bottom: 1.5rem;">
     <div class="mainHeader">
      <img src="../main/LOGO.png" alt="">
    </div>
    <div class="indexPage"   >
      
      <swiper :options="swiperOption" class="swiper-box-main headSwiper">
          <swiper-slide class="swiper-item" v-for="baner in pageData.banner">
              <img style="width: 100%;height: 8rem;" :src="baner.imagePath" @click="gotoAd(baner)">
          </swiper-slide>
          <div class="swiper-pagination" style="line-height: 0.7rem;bottom: 1px;height: 1rem;background: #383f49" slot="pagination"></div>
      </swiper>
      <div class="wanplustoutiaoDiv">
        <img class="wanplusToutiao" src="../main/wanplustoutiao.png" alt="">
        <span class="scrollAd">
          这个组件好像只有自己写了
        </span>
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
         <img class="imgTitle" src="../main/new.png" alt="">
         <div class="catImageDiv">
            <img  :src="cat.adImage" v-for="cat in pageData.ad_new" alt="" @click="gotoAd(cat)" >
         </div>
      </div>
      <div class="newProductsDiv">
          <img class="imgTitle" src="../main/recommend.png" alt="">
          <img class="imgBigCat" :src="recommendBigImg.adImage" alt="">
         <div class="catImageDiv">
            <img  :src="cat.adImage" v-for="cat in recommendSmallImages" alt="" @click="gotoAd(cat)">
         </div>
      </div>
       <div class="newProductsDiv">
          <img class="imgTitle" src="../main/popular.png" alt="">
          <img class="imgBigCat" :src="popularBigImage.adImage" alt="">
         <div class="catImageDiv">
            <img  :src="cat.adImage" v-for="cat in popularSmallImage" alt="" @click="gotoAd(cat)">
         </div>
      </div>
       <div class="newProductsDiv">
          <img class="imgTitle" src="../main/custom.png" alt="">
          <img class="imgBigCat" :src="customBigImage.adImage" alt="">
         <div class="catImageDiv">
            <img  :src="cat.adImage" v-for="cat in customSmallImage" alt="" @click="gotoAd(cat)">
         </div>
      </div>
      <div class="hotProject">
         <div>
           <img src="../main/hot.png" style="height: 0.6rem;margin: 0.3rem 0.3rem;" alt="">
         </div>
         <div class="hotProjects">
           <div class="hotProjectItem" v-for="pro in hotProjects" @click="gotoProduct(pro.id)">
              <img :src="pro.goodsThumb" alt="">
              <div>
                {{pro.goodsName}}
              </div>
              <span class="productZan"> <img src="../main/like.png" alt=""> <span style="vertical-align: middle">{{pro.zan}}</span> </span>
           </div>
           <div style="clear: both"></div>
         </div>
      </div>
   
   

    </div>
    </mt-loadmore>
    <openApp class="openAppClass"></openApp>
    <bottomMenu ></bottomMenu>
    </div>
</template>
<script>
 import Vue from 'vue'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
 import { Toast } from 'mint-ui'
 import 'mint-ui/lib/toast/style.css'
 import axios from 'axios'
 import openApp from '../../components/openApp.vue'
 import bottomMenu from './wbfoot.vue'
 export default{
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 5,
          mousewheelControl: true
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
            }
            else{
                
            }
        })
    },
     components: {
        swiper,
        swiperSlide,
        openApp,
        bottomMenu
    },
    methods:{
      loadBottom(id){
        this.$refs.loadmore.onBottomLoaded();
        console.log('load more')
        this.allLoaded = true
        console.log(this.pageIndex)
        //let url = "http://localhost:8880/index/index/index?page=" + this.pageIndex
        let url = "https://app.playnet.cc/index/index/index?page=" + this.pageIndex
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
          this.$router.push({ name: 'webView'})
        }
      },
      gotoProduct(id){
        this.$router.push({ name: 'product', params: { id:id }})
      },
      gotoProductList(type){
        console.log(type)
         this.$router.push({ name: 'productList', params: { type:type.id - 3 }})
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
div.indexPage{
  font-size: 0.5rem;
}
.mainHeader{
  background: #383f49;
  height: 1.5rem;
  text-align: center;
  line-height: 1.5rem;
}
.mainHeader img{
  width: 1.5rem;
  height: 0.8rem;
  vertical-align: middle;
}
 .swiper-box-main {
    width: 100%;
    height: 7rem;
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
div.wanplustoutiaoDiv{
  background: white;
padding: 0.2rem 0.3rem;
vertical-align: middle;
}
img.wanplusToutiao{
  width: 2rem;
  vertical-align: middle;

}
span.scrollAd{
  font-size: 0.35rem;
  color: #aaa;
}
div.productCatDiv{
  background: white;
}
div.fourCatDic{
  font-size: 0.4rem;
 text-align: center;
  display: flex;
  margin-top: 0.3rem;
  padding-top: 0.4rem;
}
div.fourCatDic div{
  width:25%;

}
div.fourCatDic div img{
  width: 65%;
}

div.twoCatDic img{
  width: 45%;
  padding-top: 0.3rem;
  padding-left: 0.35rem;
}
div.newProductsDiv{
  background: white;
  margin-top: 0.3rem;
  text-align: center;
}
.imgTitle{
  height: 0.45rem;
  margin-top: 0.3rem;
  margin-bottom: 0.2rem;
}
.catImageDiv{
  display: flex;
  justify-content: space-around;
  padding-bottom: 0.3rem;
}
.catImageDiv img{
  width: 3rem;
  height: 3rem;
}
.imgBigCat{
  width: 94%;
  margin-bottom: 0.2rem;
}
div.hotProject{
  text-align: center;
}
div.hotProjects{
  background: white;
  padding-top: 0.3rem;
}
div.hotProjectItem{
  width: 46%;
  padding: 0.2rem;
  float: left;
  height: 3.6rem;
  overflow: hidden;
  font-size: 0.28rem;
  text-align: left;
  position: relative;
}
div.hotProjectItem img{
  width: 100%;
  height: 3rem;
}
span.productZan{
  background: #444;
  opacity: 0.5;
  color: white;
  padding: 0.05rem 0.1rem;
  border-radius: 0.1rem;
  position: absolute;
  right: 0.5rem;
  top: 0.4rem;
}
span.productZan img{
  width: 0.2rem;
  height: 0.2rem;
  vertical-align: middle;
}
.openAppClass{
  top: 0px;
  height: 1.5rem;
}
</style>