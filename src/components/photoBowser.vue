<template>
    <div class="photoBorswerMainDiv">
        <div class="photoBorswerHeader">
            
        </div>
       <div>
          <swiper :options="swiperOption" class="swiper-box-main headSwiper">
                <swiper-slide class="swiper-item" v-for="img in imgs">
                    <img style="width: 100%" :src="img">
                </swiper-slide>
                <div class="swiper-pagination" style="line-height: 0.7rem;bottom: 1px;height: 1rem;background: #383f49" slot="pagination"></div>
         </swiper>
       </div>
    </div>
</template>
<script>
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
     export default {
        data(){
            return{
                swiperOption: {
                    pagination: '.swiper-pagination',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 5,
                    mousewheelControl: true
                },
            }
        },
        props: {   
           imgs: {
             type: Array
         },
        },
        methods:{
           
        },
        components: {
            swiper,
            swiperSlide,
       },
    }
</script>
<style>
.photoBorswerImg{
    width: 100%;
}
.photoBorswerImgs{
    overflow: scroll
}
</style>