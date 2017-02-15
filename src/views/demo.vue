<template>
  <div>
      <imgBoswer :imgs='imgs' v-on:back="back"></imgBoswer>
  </div>
</template>

<script>
 import Vue from 'vue'
 import imgBoswer from '../components/photoBowser.vue'
    
  export default {
    data() {
      return {
        imgs:[]
      }
    },
    mounted(){
        let z = ['http://d.5857.com/xgmnxz_140411/001.jpg','http://d.5857.com/xgmnxz_140411/001.jpg',
        'http://d.5857.com/xgmnxz_140411/001.jpg',]
        this.imgs = z
    },
    components: {
        imgBoswer
    },
    methods:{
        back(){
            console.log('back')
        }
    }
  }
</script>

