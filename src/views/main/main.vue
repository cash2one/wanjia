<template>
    <div class="indexPage">
      <mt-header fixted class="mainHead" title="玩+" >
         <mt-button slot="left" style="font-size: 0.5rem !important" >深圳</mt-button>
          <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
      <swiper :options="swiperOption" class="swiper-box headSwiper">
          <swiper-slide class="swiper-item" v-for="baner in pageData.banner">
              <img style="width: 100%;height: 8rem;" :src="baner.imagePath">
          </swiper-slide>
          <div class="swiper-pagination" style="line-height: 0.7rem;bottom: 1px;height: 1rem;background: #383f49" slot="pagination"></div>
      </swiper>
      <div class="wanplustoutiaoDiv">
        <img class="wanplusToutiao" src="./wanplustoutiao.png" alt="">
        <span class="scrollAd">
          这个组件好像只有自己写了
        </span>
      </div>
    </div>
</template>
<script>
 import Vue from 'vue'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
 import axios from 'axios'
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
        loading:true,
        pageData:{},
      }
    },
    mounted(){
      let url = "http://localhost:8880/index/index/index?page=0"
      axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
                this.pageData = res.data
            }
            else{
                
            }
        })
    },
     components: {
        swiper,
        swiperSlide,
    }
 }
</script>
<style>
.mainHead{
  height: 1.5rem !important;
  background: #383f49 !important;
  font-size: 0.7rem !important;
}
 .swiper-box {
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

}
img.wanplusToutiao{
  width: 2rem;

}
span.scrollAd{
  font-size: 0.35rem;
  color: #aaa;
 
}
</style>