<template>
    <div style="font-size: 0.5rem;">
        <div class="wbProductTitle">
            <div>
                {{product.goodsName}}
            </div>
        </div>

        <div class="wbChooseDate">
            <div>
                选择日期
            </div>
            <div class="wbDateList">
                <div class="wbDateItem" v-for="date in listedDates">
                    <div>
                        {{date.date.substring(5,10)}}
                    </div>
                    <div>
                        {{date.price}}
                    </div>
                </div>
                <div class="wbDateItem wbMoreDate">
                    更多日期
                </div>
            </div>

            
        </div>

         <div class="wbProductCat">
            <div v-for="cat in productCat">
                <span>
                    {{cat.styleName}}
                </span>
                <span>
                    单价￥{{cat.price}}
                </span>
                <counter class="wbCounter" :count = "0" :maxCount="10"></counter>
            </div>
        </div>

        <div v-if="productService.length > 0" class="wbProductService">
            <div class="wbProductOtherService">
                其他服务
            </div>
            <div v-for="cat in productService">
                <span>
                    {{cat.styleName}}
                </span>
                <span>
                    单价￥{{cat.servicePrice}}
                </span>
                <counter class="wbCounter" :count = "0" :maxCount="10"></counter>
            </div>
        </div>

    </div>
</template>
<script>
     import Vue from 'vue'
     import productInfo from '../../../model/productInfo'
     import counter from '../../../components/counter.vue'
 export default{
    data() {
      return {
       product:{},
       listedDates:[],
       productCat:[],
       productService:[]
      }
    },
    mounted(){
      this.product = this.$store.state.product
      if(!isEmpty(this.product)){
        this.listedDates = this.product.goodsCalendar.splice(0,4)
        this.productCat = this.product.goodsGuige
        this.productService = this.product.goodsInclude
      }
      else{
        let that = this
        let id = this.$route.params.id
        productInfo.getProducts(id).then(function(data){
            console.log(data)
                that.product = data.data
                that.listedDates =  that.product.goodsCalendar.splice(0,4)
                that.productCat = that.product.goodsGuige
                that.productService = that.product.goodsInclude
                
            },function(error){
                console.log(data.msg)
        })

    
      }
    },   
    components:{
        counter
    }
 }
</script>
<style>
.wbProductTitle{
    background: white;
}
.wbChooseDate{
    background: white;
}
.wbDateList{
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.wbDateItem{
    border: 1px solid #aaa;
    width: 1.7rem;
    height: 1.5rem;

}
.wbMoreDate{
   
}
.wbProductCat{
    margin-top: 0.2rem;
    background: white;
}
.wbCounter{
    width: 2rem;
    height: 0.7rem;
    line-height: 0.7rem;
    float: right;
}
.wbProductService{
    margin-top: 0.2rem;
    background: white;
}
.wbProductOtherService{
    text-align: center;
    background: #eee;
}
</style>