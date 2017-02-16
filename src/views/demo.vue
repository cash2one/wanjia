<template>
  <div>
      <button type="" @click="show" >show</button>
      <marquee class="ms"  :msgs = "msgs"></marquee>
  </div>
</template>

<script>
 import Vue from 'vue'
 import imgBoswer from '../components/photoBowser.vue'
 import marquee from '../components/marquee.vue'
  export default {
    data() {
      return {
        imgs:[],
        index:0,
        msgs:[],
      }
    },
    mounted(){
        let z = ['http://d.5857.com/xgmnxz_140411/001.jpg','http://d.5857.com/xgmnxz_140411/001.jpg',
        'http://d.5857.com/xgmnxz_140411/001.jpg',]
        this.imgs = z
        this.index = 1
        let zz = ['该尽可能减少 dirty 内存的创建','要尽量保证 dirty 内存用完之后及时释放',
        '及时处理系统内存告警通知，释放掉大量占用内存并且可重建的对象',
        '在发生内存告警时，不再持续申请内存，更不能申请较大']
        this.msgs = zz
    },
    components: {
        imgBoswer,
        marquee
    },
    methods:{
        back(){
            console.log('back')
        },
        show(){
            this.$refs.imgSwipers.show();
        }
    }
  }
</script>
<style>
    .ms{
        font-size: 0.5rem;
        height: 2rem;
    }
</style>