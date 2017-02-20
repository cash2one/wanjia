<template>
  <div class="counterClass">
     <span class="cartMinus" @click.stop.prevent="minus($event)">-</span>
     <span class="cart-count">
      {{count}}
    </span>
    <span class="cartAdd" @click.stop.prevent="add($event)">+</span>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    props: {
      count: {
        type: Number
      },
      maxCount:{
        type: Number,
        default:0
      }
    },
    methods: {
      add(event) {
        console.log(this.maxCount)
       
        
        if(this.maxCount != 0){
          if(this.count >= this.maxCount){
            return
          }
        }
        
          this.count ++
        
        this.$emit('increment', count); // 子组件通过 $emit触发父组件的方法 increment   还
      },
      minus(event) {
        if(this.count > 0){
          this.count --
          this.$emit('decrement', count); // 子组件通过 $emit触发父组件的方法 increment   还
        }
        
      }
    }
  };
</script>
<style>
  .counterClass{
    display: inline-flex;
    border: 1px solid #ccc;
    border-radius: 0.1rem;
    justify-content: space-around;
    text-align: center;
  }
  .cartMinus{
    border-right: 1px solid #ccc;
  
    width: 27%;
  }
  .cartAdd{
    border-left: 1px solid #ccc;
    width: 27%;
  }
  .cart-count{
    font-size: 0.5rem;
  }
</style>
