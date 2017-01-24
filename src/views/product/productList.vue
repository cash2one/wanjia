<template>
    <div class="mainProductListDiv">
        <div class="titleTabBar">
            <mt-navbar v-model="selected">
            <mt-tab-item :id="item.id" v-for="item in productListTitle" >{{item}}</mt-tab-item>
          
            </mt-navbar>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
  export default {
    data() {
      return {
        selected:'运动休闲',
        productListTitle:["运动休闲","旅游商务","社交活动","定制服务"]
      }
  },
  mounted(){
      let selectedId = this.$route.params.id
     

  }
  // props: ['selected']
}
</script>