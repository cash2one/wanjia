
<template>
  <div style="font-size: 1rem;">
    <head-top class="mainHead"  headImage="static/img/main/LOGO.png" >
        <span slot='logo' class="head_logo"   >深圳</span>
    </head-top>
    <scroller  class="mainContent" lock-x :scrollbar-y=false height='-50' ref='scroller' use-pullup  @on-pullup-loading="loadBottom" :pullup-config="pullupConfig"
       >
      <div class="indexPage"   >  
        <swiper :options="swiperOption" class="swiper-box-main headSwiper" ref="mainSwiper">
            <swiper-slide class="swiper-item" v-for="baner in pageData.banner">
                <img style="width: 100%;height: 10rem;" :src="baner.imagePath" >
            </swiper-slide>
            <div class="swiper-pagination" style="line-height: 0.7rem;bottom: 1px;height: 1rem;background: #383f49" slot="pagination"></div>
        </swiper>
        <div class="wanplustoutiaoDiv">
          <img class="wanplusToutiao" src="static/img/main/wanplustoutiao.png" alt="">
          <div class="scrollAd">
                <marquee class="scrollAdMarquee"  :msgs = "marquees" @click='click' ></marquee>
          </div>
        </div>
        <div class="productCatDiv">
          <div class="fourCatDic">
            <div v-for="cat in pageData.ad_category" @click="gotoProductList(cat)">
              <img :src="cat.adImage" alt="">
              <span style="display: block;font-size: 0.57rem; color: #666 !important">{{cat.adText}}</span>
            </div>
          </div>
          <div class="twoCatDic">
            <img :src="car.adImage" v-for="car in pageData.ad_mall_finance" alt="" @click="gotoAd(car)">
          </div>
        </div>
        <div class="newProductsDiv">
          <img class="imgTitle" src="static/img/main/new.png" alt="" >
          <div class="catImageDiv">
              <img  :src="cat.adImage" v-for="cat in pageData.ad_new" alt="" @click="gotoAd(cat)" >
          </div>
        </div>
        <div class="newProductsDiv">
            <img class="imgTitle" src="static/img/main/recommend.png" alt="">
            <img class="imgBigCat" :src="recommendBigImg.adImage" alt="" @click="gotoAd(recommendBigImg)" >
          <div class="catImageDiv">
              <img  :src="cat.adImage" v-for="cat in recommendSmallImages" alt="" @click="gotoAd(cat)">
          </div>
        </div>
        <div class="newProductsDiv">
            <img class="imgTitle" src="static/img/main/popular.png" alt="">
            <img class="imgBigCat" :src="popularBigImage.adImage" alt="" @click="gotoAd(popularBigImage)">
          <div class="catImageDiv">
              <img  :src="cat.adImage" v-for="cat in popularSmallImage" alt="" @click="gotoAd(cat)">
          </div>
        </div>
        <div class="newProductsDiv">
            <img class="imgTitle" src="static/img/main/custom.png" alt="">
            <img class="imgBigCat" :src="customBigImage.adImage" alt="" @click="gotoAd(customBigImage)">
          <div class="catImageDiv">
              <img  :src="cat.adImage" v-for="cat in customSmallImage" alt="" @click="gotoAd(cat)">
          </div>
        </div>
        <div class="hotProject">
          <div>
            <img src="static/img/main/hot.png" style="height: 0.8rem;margin-top: 0.3rem;margin-bottom: 0.2rem" alt="">
          </div>
          <div class="hotProjects">
            <div class="hotProjectItem" v-for="pro in hotProjects" @click="gotoProduct(pro.id)">
                <img :src="pro.goodsThumb" alt="">
                <div>
                  {{pro.goodsName}}
                </div>
                <span class="productZan"> <img src="static/img/main/like.png" alt=""> <span style="vertical-align: middle;color: white">{{pro.zan}}</span> </span>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
     </div>
    </scroller>
    <openApp class="topOpenApp"></openApp>
    </div>
</template>
<script>
 import Vue from 'vue'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
import headTop from '../../components/head'
import axios from 'axios'
import marquee from '../../components/marquee.vue'
import openApp from '../../components/openApp.vue'
import { Scroller } from 'vux'
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
        pullupConfig: {
          content: '上拉加载更多',
          downContent: '松开进行加载',
          upContent: '上拉加载更多',
          loadingContent: '加载中...'
        },
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
                this.$nextTick(() => {
                  this.$refs.scroller.reset()
                  let that = this
                   this.swiper.params.onClick = function(swiper){
                      that.gotoAd(that.pageData.banner[swiper.realIndex])
                  }
                })
            }
            else{
                
            }
        })
    },
     components: {
        swiper,
        swiperSlide,
        marquee,
        openApp,
        headTop,
        Scroller
    },
    methods:{
      loadBottom(){ 
        //let url = "http://localhost:8880/index/index/index?page=" + this.pageIndex
        let url = "https://app.playnet.cc/index/index/index?page=" + this.pageIndex
        console.log('首页url:' + url)
        axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
              this.$refs.scroller.donePullup()
              this.pageIndex ++ 
              this.hotProjects = this.hotProjects.concat(res.data)
               this.$nextTick(() => {
                  this.$refs.scroller.reset()
                })
            }
            else{
              this.$refs.scroller.disablePullup()
                 this.$vux.toast.show({
                   text: '已经全部加载完',
                   position:"bottom",
                   type:'text'
                })
            }
        })
      },
      gotoAd(adInfo){
        if(adInfo.type == 1){
          this.gotoProduct(adInfo.id)
        }
        else{
          this.$store.commit('setWebUrl', adInfo.adUrl)
          this.$router.push({ name: 'web'})
        }
      },
      gotoProduct(id){
        console.log('gotoProduct'+id)
        this.$router.push({ name: 'product', params: { id:id }})
      },
      gotoProductList(type){
        console.log(type)
         this.$router.push({ name: 'productList', params: { id:type.id - 3 }})
      },
      click(msg){
        this.$store.commit('setWebUrl', msg.url)
        this.$router.push({ name: 'web'})
      },
    },
    computed: {
      swiper() {
        return this.$refs.mainSwiper.swiper
      }
    },
 }
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.head_logo{
 color: white;
 font-size: 0.8rem;
 margin-left: 0.5rem;
  @include ct;
}

.mainContent{
  margin-bottom: 1.2rem;
  margin-top: 2rem;
}

 .swiper-box-main {
    width: 100%;
    height: 10rem;
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
  vertical-align: middle;
  display: flex;
  height: 1.8rem;
}
img.wanplusToutiao{
  width: 3.3rem;
  vertical-align: middle;
  padding: 0.6rem 0.4rem;
}
div.scrollAd{
  font-size: 0.55rem;
  color: #aaa !important;
  margin-left: 0.7rem;
}
.scrollAdMarquee{
  height: 1rem;
  width: 100%;
  margin-top:0.35rem;
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

div.twoCatDic{
  img {
      width: 45%;
     padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-bottom:0.3rem;
  }
}

div.newProductsDiv{
  background: white;
  margin-top: 0.3rem;
  text-align: center;
}
.imgTitle{
  height: 0.6rem;
  margin-top: 0.5rem;
  margin-bottom: 0.3rem;
}
.catImageDiv{
  display: flex;
  justify-content: space-around;
  padding-bottom: 0.5rem;
  padding-left: 0.25rem;
  padding-right: 0.2rem;
}
.catImageDiv img{
  width:30%;
  height: 4.8rem;
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
  width: 50%;
  padding: 0.3rem;
  float: left;
  height: 6.7rem;
  overflow: hidden;
  font-size: 0.53em;
  text-align: left;
  position: relative;
}
div.hotProjectItem img{
  width: 100%;
  height: 4.8rem;
  border-radius: 0.15rem;
}
span.productZan{
  background: rgba(100, 100, 100, 0.5);
  
  color: white;
  padding: 0.05rem 0.1rem;
  border-radius: 0.1rem;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
span.productZan img{
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: middle;
}
  .topOpenApp{
    top: 0px;
    z-index: 100;
   
    position: fixed;
  }


</style>
<style>
  .xs-plugin-pullup-container{
    font-size: 0.8rem;
  }
  .vux-toast-bottom{
    bottom: 80px !important;
  }
</style>