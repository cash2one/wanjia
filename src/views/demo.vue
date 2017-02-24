<template>
  <div>
     <Scroller  lock-x :scrollbar-y=false height="-40">
       <div>
         <div  v-for="n in 5">
           {{n}}
         </div>
         <div  v-for="n in 20">
          qeqweqwew {{n}}
         </div>
       </div>
     </Scroller>
  </div>
</template>

<script>
 import Vue from 'vue'
 import imgBoswer from '../components/photoBowser.vue'
 import marquee from '../components/marquee.vue'
 import cal from '../components/Calendar.vue'
 import { Scroller } from 'vux'
  export default {
    data() {
      return {
        imgs:[],
        
      }
    },
    
    components: {
        imgBoswer,
        marquee,
        cal,
        Scroller
    }

  }
</script>
<style >
  

</style>