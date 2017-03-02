<template>
  <div>
   <swiper v-model="index" class="productItem" :show-dots="false" >
        <!--<swiper-item :key="0" v-for="s in demoData">
            {{s}}
        </swiper-item>-->
        
         <swiper-item >
           我想这是一个Bug，当swiper在组件 里时，transform: translate3d(0px, 0px, 0px); 就全是9 ，这个确实是个很大的问题
        </swiper-item>
        <swiper-item >
           2
        </swiper-item>
        <swiper-item >
           3
        </swiper-item>
        <swiper-item >
           4
        </swiper-item>

   </swiper>
  </div>
</template>

<script>
 import { Tab, TabItem,Swiper, SwiperItem} from 'vux'
 import { Scroller } from 'vux'
 import { Checker, CheckerItem } from 'vux'
  export default {
    data() {
      return {
        imgs:[],
        index:0,
        demoData: [2, 3,2, 3,2, 3,2, 3]
      }
    },
    components: {
        Scroller,Checker, CheckerItem,   Tab, TabItem,Swiper, SwiperItem
    }

  }
</script>
<style >
  .demo5-item{
    width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
  }
.demo5-item-selected {

  border-color: #ff4a00;
}
</style>