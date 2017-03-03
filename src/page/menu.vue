<template>
  <div>
        <router-link :to="{ name: 'collegeEventInfo', params: { id: 60 }}">活动</router-link>
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