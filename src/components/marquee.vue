<template>
  
        <div  >
            <swiper ref = "marqueeSwiper" :options="swiperOption" class="swiper-marquee" >
                <swiper-slide class="swiper-marquee-item" v-for = "msg in cMsgs">
                  {{msg.title}}
                </swiper-slide>
                
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
          notNextTick: true,
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
          autoplay: 3000,
          mousewheelControl: true,
          direction : 'vertical',
          loop:true,
          autoplayDisableOnInteraction:false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
          onSlideChangeEnd(swiper){
            
          },
       
        },
        cMsgs:[],
        count:0,
        currentIndex:0,
      }
    },
    props: {   
        msgs: {
             type: Array
        },
        
    },
    mounted(){
      // this.swiper.swiperOption.onClick = function(swiper){
      //   console.log('123')
      // }
     // console.log(this.swiper.params.onClick)
      var that = this
      this.swiper.params.onClick = function(swiper){  //终于找到了
        // console.log()
         that.$emit('click',that.cMsgs[swiper.realIndex])
      }
      
  },
    computed: {
      swiper() {
        return this.$refs.marqueeSwiper.swiper
      }
    },
  
    components: {
        swiper,
        swiperSlide
    },
    watch:{
        msgs:function(val){
            // let first = val[0]
            //  var tem = val
            //   tem.push(first)
            //it has a loop bug
            this.cMsgs = val
        },

    },
   
  }
</script>

<style >
  body {
    background: #eee;
  }


  .swiper-marquee {
    /*width: 100%;*/
    z-index: 1;
    margin: 0 auto;
    height: inherit;
    background: white;
  }
  .swiper-marquee-item {
    text-align: center;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    width: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>