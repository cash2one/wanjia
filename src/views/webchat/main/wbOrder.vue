<template>
    <div>
        <div class="wbProductTitle">
            <div>
                {{product.goodsName}}
            </div>
            <div>
                
            </div>
        </div>
    </div>
</template>
<script>
     import Vue from 'vue'

 export default{
    data() {
      return {
       product:{}
      }
    },
    mounted(){
      this.product = this.$store.state.product
      console.log(this.product)
    },   
 }
</script>
<style>

</style>