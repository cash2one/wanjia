<template>
    <div class="mainProductListDiv">
        <div class="titleTabBar">
            <mt-navbar v-model="selected">
                 <mt-tab-item class="productCatTitle" id="0" >运动休闲</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="1" >旅游商务</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="2" >社交活动</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="3" >定制服务</mt-tab-item>
            </mt-navbar>
        </div>
      
        <mt-tab-container  class="productItem" v-model="selected">
            <mt-tab-container-item id="0">
                <div class="catProductList">
                    <div class="catProductListItem" v-for="item in cat1" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                        {{item.fullName}}
           
                    </div>
                </div>
                <mt-cell v-for="(index,item) in products1"  >
                    {{index}}
                </mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 4" :title="'测试 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 6" :title="'选项 ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
        
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
  export default {
    data() {
      return {
        selected:'0',
        cat1:{},
        cat2:{},
        cat3:{},
        cat4:{},
        products1:{},
        products2:{},
        products3:{},
        products4:{}
      }
  },
  mounted(){
      let selectedId = this.$route.params.type
      console.log(selectedId)
      this.selected = (selectedId - 1).toString()
      let url = 'https://app.playnet.cc/index/goods/category/id/' + selectedId
       axios.get(url).then(response=>{
            var res = response.data;
                if(res.ret_code == 0) {
                    console.log(res.data.category)
                    let cat =  res.data.category
                    let catExist = []
                    for(let c of cat){
                        if(res.data[c.id].length > 0){
                        catExist.push(c)
                        }
                    }
                    let products = {}
                    for(let c of catExist){
                        products[c.id] = res.data[c.id]
                    }
                    console.log(products)
                    switch (this.selected) {
                        case '0':
                            this.cat1 = catExist
                            this.products1 = products
                            break;
                    
                        default:
                            break;
                    }
                
                }
                else{
                    
                }
          })
  },
  methods:{
      selectCat(item,event){
          console.log(event.currentTarget)
          let ele = event.currentTarget
          ele.addclass()
      }
  }
  // props: ['selected']
}
</script>
<style>
.titleTabBar{
    position: fixed;
    height: 1.3rem;
    width: 80%;
    left: 0;
    right: 0;
    margin: 0 auto;
}
.productCatTitle div{
    font-size: 0.4rem !important;
}
.is-selected{
    color: limegreen !important;
    border-bottom-color: limegreen !important;
}
.productItem{
    margin-top: 0.1rem;
    position: absolute;
    top: 1.3rem;
}
.catProductList{
    height: 2rem;
    display: flex;
    font-size: 0.3rem;
    overflow: scroll;
    justify-content: center;
    background: white;
}
.catProductListItem{
    width: 2rem;
    height: 1rem;
    padding: 0.2rem 0.5rem;
    text-align: center;
    color: #999;
}
.catProductListItem img{
    width: 1rem;
    height: 1rem;
    
}
.productCatSelected{
    color: #444;
    padding: 0.1rem 0.4rem;
}

</style>