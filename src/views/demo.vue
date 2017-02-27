<template>
  <div>
      <checker
 
    type="checkbox"
    default-item-class="demo5-item"
    selected-item-class="demo5-item-selected"
    >
      <checker-item v-for="i in [1, 2, 3]" :value="i">{{i - 1}}</checker-item>
    </checker>
  </div>
</template>

<script>
 import Vue from 'vue'
 import imgBoswer from '../components/photoBowser.vue'
 import marquee from '../components/marquee.vue'
 import cal from '../components/Calendar.vue'
 import { Scroller } from 'vux'
 import { Checker, CheckerItem } from 'vux'
  export default {
    data() {
      return {
        imgs:[],
        demo6: [2, 3]
      }
    },
    
    components: {
        imgBoswer,
        marquee,
        cal,
        Scroller,Checker, CheckerItem
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
 background: #ffffff url(../static/img/check_selected.png) no-repeat right bottom;
  border-color: #ff4a00;
}
</style>