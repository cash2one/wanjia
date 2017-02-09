<template>
    <div class="mainProductListDiv">
       <div class="productsTitle">
            <div class="titleTabBar">
            <mt-navbar v-model="selected">
                 <mt-tab-item class="productCatTitle" id="0" >运动休闲</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="1"  >旅游商务</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="2"  >社交活动</mt-tab-item>
                 <mt-tab-item class="productCatTitle" id="3"  >定制服务</mt-tab-item>
            </mt-navbar>
         </div>
       </div>
      
        <mt-tab-container  class="productItem" v-model="selected">
            <mt-tab-container-item id="0">
                <div class="catProductList">
                    <div class="catProductListItem" v-for="item in cat1" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                        <span class="catProductListItemTitle">{{item.fullName}}</span>
           
                    </div>
                </div>
                <mt-cell v-for="item in cat1"  >
                    <div >
                        {{item.fullName}}
                    </div>
                    <div>
                        <div class="productItemClass" v-for="pros in products1[item]">
                            <img class="productImg" :src="pros.goodsThumb" alt="">
                            <div class="divLike">
                                <img src="./like.png" alt="">
                                <span>{{pros.zan}}</span>
                            </div>
                            <img class="productImgServiceLogo" :src="pros.thumb" alt="">
                            <span class="productServiceName">{{pros.businessName}}</span>
                            <span class="productTitle">{{pros.goodsName}}</span>
                            <span class="productPrice"> <span style="font-size: 0.4rem" >￥</span> {{pros.goodsPrice}}</span>
                        </div>
                    </div>
                </mt-cell>
            </mt-tab-container-item>


            <mt-tab-container-item id="1">
                <div class="catProductList">
                    <div class="catProductListItem" v-for="item in cat2" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                         <span class="catProductListItemTitle">{{item.fullName}}</span>
           
                    </div>
                </div>
                <mt-cell v-for="item in cat2"  >
                    <div >
                        {{item.fullName}}
                    </div>
                    <div>
                        <div class="productItemClass" v-for="pros in products2[item]">
                            <img class="productImg" :src="pros.goodsThumb" alt="">
                            <img class="productImgServiceLogo" :src="pros.thumb" alt="">
                            <span class="productServiceName">{{pros.businessName}}</span>
                            <span class="productTitle">{{pros.goodsName}}</span>
                            <span class="productPrice"> <span style="font-size: 0.4rem" >￥</span> {{pros.goodsPrice}}</span>
                        </div>
                    </div>
                </mt-cell>
            </mt-tab-container-item>


             <mt-tab-container-item id="2">
                <div class="catProductList">
                    <div class="catProductListItem" v-for="item in cat3" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                         <span class="catProductListItemTitle">{{item.fullName}}</span>
           
                    </div>
                </div>
                <mt-cell v-for="item in cat3"  >
                    <div >
                        {{item.fullName}}
                    </div>
                    <div>
                        <div class="productItemClass" v-for="pros in products3[item]">
                            <img class="productImg" :src="pros.goodsThumb" alt="">
                            <img class="productImgServiceLogo" :src="pros.thumb" alt="">
                            <span class="productServiceName">{{pros.businessName}}</span>
                            <span class="productTitle">{{pros.goodsName}}</span>
                            <span class="productPrice"> <span style="font-size: 0.4rem" >￥</span> {{pros.goodsPrice}}</span>
                        </div>
                    </div>
                </mt-cell>
            </mt-tab-container-item>

             <mt-tab-container-item id="3">
                <div class="catProductList">
                    <div class="catProductListItem" v-for="item in cat4" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                         <span class="catProductListItemTitle">{{item.fullName}}</span>
           
                    </div>
                </div>
                <mt-cell v-for="item in cat4"  >
                    <div >
                        {{item.fullName}}
                    </div>
                    <div>
                        <div class="productItemClass" v-for="pros in products4[item]">
                            <img class="productImg" :src="pros.goodsThumb" alt="">
                            <img class="productImgServiceLogo" :src="pros.thumb" alt="">
                            <span class="productServiceName">{{pros.businessName}}</span>
                            <span class="productTitle">{{pros.goodsName}}</span>
                            <span class="productPrice"> <span style="font-size: 0.4rem" >￥</span> {{pros.goodsPrice}}</span>
                        </div>
                    </div>
                </mt-cell>
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
      this.selected = (selectedId - 1).toString()
      this.loadData(selectedId.toString())
  },
  methods:{
      selectCat(item,event){
          console.log(event.currentTarget)
          let ele = event.currentTarget
      },
      loadData(cat){
           let url = 'https://app.playnet.cc/index/goods/category/id/' + cat
          axios.get(url).then(response=>{
            var res = response.data;
                if(res.ret_code == 0) {
                    console.log(res.data.category)
                    let cats =  res.data.category
                    let catExist = []
                    for(let c of cats){
                        if(res.data[c.id].length > 0){
                        catExist.push(c)
                        }
                    }
                    let products = {}
                    for(let c of catExist){
                        products[c] = res.data[c.id]
                    }
                    switch (cat) {
                        case '1':
                            this.cat1 = catExist
                            this.products1 = products
                            break;
                        case '2':
                               
                                this.cat2 = catExist
                                this.products2 = products
                                break;
                        case '3':
                                this.cat3 = catExist
                                this.products3 = products
                                break;
                        case '4':
                                this.cat4 = catExist
                                this.products4 = products
                                break;
                        default:
                            break;
                    }
                
                }
                else{
                    
                }
          })
      }
  },
  watch:{
      selected:function(val){
          switch (val) {
             case '0':
                  
                  break;
             case '1':
                  if(isEmpty(this.cat2)){
                      this.loadData('2')
                  }
                  break;
            case '2':
                  if(isEmpty(this.cat3)){
                      this.loadData('3')
                  }
                  break;
            case '3':
                  if(isEmpty(this.cat4)){
                      this.loadData('4')
                  }
                  break;
              default:
                  break;
          }
      }
  }
  // props: ['selected']
}
</script>
<style>
.productsTitle{
    background: white;
    z-index: 102;
     height: 1.3rem;
}
.titleTabBar{
    position: fixed;
    height: 1.3rem;
    width: 80%;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 101;
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
    z-index: 1;
}
.catProductList{
    height: 2rem;
    display: flex;
    font-size: 0.3rem;
    overflow: scroll;
    justify-content: center;
    background: white;
}
.mint-cell-wrapper{
    padding: 0px !important;
}
.mint-cell-value{
    flex-direction: column;
}
.catProductListItem{
    height: 1rem;
    padding: 0.2rem 0.5rem;
    text-align: center;
    color: #999;
}
.catProductListItem img{
    width: 1rem;
    height: 1rem;
}
.catProductListItemTitle{
    display: block;
}
.productCatSelected{
    color: #444;
    padding: 0.1rem 0.4rem;
}
.productItemClass{
   padding: 0.2rem;
    position: relative;
}
.productItemClass .productImg{
   height: 5.5rem;
   width: 100%;
}
.divLike{
    position: absolute;
    widows: 1rem;
    height: 0.5rem;
    right: 0.5rem;
    top: 0.5rem;
    background: #aaa;
    border-radius: 0.1rem;
}
.divLike img{
    width: 0.3rem;
    height: 0.25rem;
    vertical-align: middle;
}
.divLike span{
    vertical-align: middle;
}
.productItemClass .productImgServiceLogo{
   border-radius: 0.5rem;
   position: absolute;
   left: 0.4rem;
   top: 5.25rem;
}
.productServiceName{
    font-size: 0.3rem;
    margin-left: 1.25rem;
}
.productTitle{
    display: block;
    font-weight: bold;
    color: #333;
    margin-top: 0.2rem;
    margin-right: 1.5rem;
}
.productPrice{
    position: absolute;
    right: 0.2rem;
    top: 6.2rem;
    color: red;
    font-size: 0.6rem;
}
</style>