<template>
    <div>
        <div class="scrollBack">
           <i class="scrollBackDiv" @click="back" >  
               <
           </i>
        </div>
    <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item" v-for = "img in imgs">
            <img :src="img" alt="" class="imgScroll">
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
 import Vue from 'vue'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
    
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
      }
    },
    props: {   
        imgs: {
             type: Array
        },
        index:{
            type:Number
        }
    },
    mounted(){
        let box = document.getElementsByClassName('swiper-box')[0]
         box.style.height = screen.height  + 'px'
       
    },
    methods:{
        back(){
            this.$emit('back')
        }
    },
    components: {
        swiper,
        swiperSlide
    }
  }
</script>

<style >
  body {
    background: #eee;
  }
  .swiper-box {
    width: 100%;
   z-index: 1;
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
  .imgScroll{
      width: 100%;
      height: 100%;
  }
 .scrollBack{
     position: absolute;
     height: 1rem;
     width: 100%;
     z-index: 100
 }
.scrollBackDiv{
    color: white;
    margin-left: 0.5rem;
}
</style>