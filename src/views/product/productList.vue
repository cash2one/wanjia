<template>
    <div >
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
            <mt-tab-container-item id="0" class="productScroll1">
                <div class="catProductList">
                    <div v-bind:class="[{catProductListItemSelected:item == selectedCat1} ,'catProductListItem']" v-for="item in cat1" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                        <span class="catProductListItemTitle">{{item.fullName}}</span>
                    </div>
                </div>
                <mt-cell v-for="item in cat1"  >
                    <div >
                        {{item.fullName}}
                    </div>
                    <div>
                        <div  @click="gotoProduct(pros)" class="productItemClass" v-for="pros in products1[item.id]">
                            <img class="productImg" :src="pros.goodsThumb" alt="">
                            <div class="divLike">
                                <img src="./like.png" alt="">
                                <span>{{pros.zan}}</span>
                            </div>
                            <div class="divSelled">
                                <img src="./selled.png" alt="">
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
                     <div v-bind:class="[{catProductListItemSelected:item == selectedCat2} ,'catProductListItem']" v-for="item in cat2" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                        <span class="catProductListItemTitle">{{item.fullName}}</span>
                    </div>
                </div>
                <mt-cell v-for="item in cat2"  >
                    <div >
                        {{item.fullName}}
                    </div>
                    <div>
                        <div @click="gotoProduct(pros)" class="productItemClass" v-for="pros in products2[item.id]">
                            <img class="productImg" :src="pros.goodsThumb" alt="">
                             <div class="divLike">
                                <img src="./like.png" alt="">
                                <span>{{pros.zan}}</span>
                            </div>
                            <div class="divSelled">
                                <img src="./selled.png" alt="">
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


             <mt-tab-container-item id="2">
                <div class="catProductList">
                    <div v-bind:class="[{catProductListItemSelected:item == selectedCat3} ,'catProductListItem']" v-for="item in cat3" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                        <span class="catProductListItemTitle">{{item.fullName}}</span>
                    </div>
                </div>
                <mt-cell v-for="item in cat3"  >
                    <div >
                        {{item.fullName}}
                    </div>
                    <div>
                        <div @click="gotoProduct(pros)" class="productItemClass" v-for="pros in products3[item.id]">
                            <img class="productImg" :src="pros.goodsThumb" alt="">
                             <div class="divLike">
                                <img src="./like.png" alt="">
                                <span>{{pros.zan}}</span>
                            </div>
                            <div class="divSelled">
                                <img src="./selled.png" alt="">
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

             <mt-tab-container-item id="3">
                <div class="catProductList">
                     <div v-bind:class="[{catProductListItemSelected:item == selectedCat4} ,'catProductListItem']" v-for="item in cat4" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                        <span class="catProductListItemTitle">{{item.fullName}}</span>
                    </div>
                </div>
                <mt-cell v-for="item in cat4"  >
                    <div >
                        {{item.fullName}}
                    </div>
                    <div>
                        <div @click="gotoProduct(pros)" class="productItemClass" v-for="pros in products4[item.id]">
                            <img class="productImg" :src="pros.goodsThumb" alt="">
                             <div class="divLike">
                                <img src="./like.png" alt="">
                                <span>{{pros.zan}}</span>
                            </div>
                            <div class="divSelled">
                                <img src="./selled.png" alt="">
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
        selectedCat1:{},
        cat2:{},
        selectedCat2:{},
        cat3:{},
        selectedCat3:{},
        cat4:{},
        selectedCat4:{},
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
      this.$nextTick(() => {
        this._initScroll()
      })
        
  },
  methods:{
      selectCat(item,event){
          console.log(event.currentTarget)
          let ele = event.currentTarget
          switch (this.selected) {
              case '0':
                   this.selectedCat1 = item
                  break;
              case '1':
                   this.selectedCat2 = item
                  break;
             case '2':
                   this.selectedCat3 = item
                  break;
             case '3':
                   this.selectedCat4 = item
                  break;
              default:
                  break;
          }
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
                        products[c.id] = res.data[c.id]
                    }
                    switch (cat) {
                        case '1':
                            this.cat1 = catExist
                            this.selectedCat1 = catExist[0]
                            this.products1 = products
                            break;
                        case '2':
                                this.selectedCat2 = catExist[0]
                                this.cat2 = catExist
                                this.products2 = products
                                break;
                        case '3':
                                this.selectedCat3 = catExist[0]
                                this.cat3 = catExist
                                this.products3 = products
                                break;
                        case '4':
                                this.selectedCat4 = catExist[0]
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
      },
      gotoProduct(pro){
        this.$router.push({ name: 'product', params: { id:pro.id }})
      },
      _initScroll(){
        // this.productScroll1 = new BScroll(document.getElementsByClassName('productScroll1')[0], {
        //   click: true
        // });

      }
  },
  watch:{
      selected:function(val){
          switch (val) {
             case '0':
                  if(isEmpty(this.cat1)){
                      this.loadData('1')
                  }
                  break;
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
     width: 100%;
     position: fixed;
     top: 0px;
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
.catProductListItemSelected{
    height: 1rem;
    padding: 0.1rem 0.4rem;
    text-align: center;
    color: #999;
}
.catProductListItem img{
    width: 1rem;
    height: 1rem;
}
.catProductListItemSelected img{
   width: 1.2rem;
    height: 1.2rem;
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
    background: white;
}
.productItemClass .productImg{
   height: 5.5rem;
   width: 100%;
}
.divLike{
    position: absolute;
    width: 0.8rem;
    height: 0.5rem;
    right: 0.5rem;
    top: 0.5rem;
    background: rgba(200, 200, 200, 0.5);
    border-radius: 0.1rem;
    text-align: center;
    vertical-align: middle;
    color: white;
    line-height: 0.5rem;
    font-size: 0.32rem;
}
.divLike img{
    width: 0.3rem;
    height: 0.25rem;
    vertical-align: middle;
}
.divLike span{
    vertical-align: middle;
}
.divSelled{
    position: absolute;
    right: 0.5rem;
    top: 5rem;
    background:rgba(200, 200, 200, 0.5);
    border-radius: 0.1rem;
    text-align: center;
    vertical-align: middle;
    color: white;
    width: 0.8rem;
    font-size: 0.32rem;
    height: 0.4rem;
    line-height: 0.4rem;
}
.divSelled img{
    width: 0.3rem;
    margin-top: -0.05rem;
    vertical-align: middle;
}
.divSelleds span{
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
    position: absolute;
}
.productTitle{
    display: block;
    font-weight: bold;
    color: #333;
    margin-top: 0.5rem;
    margin-right: 1.6rem;
    font-size: 0.5rem;
    max-height: 0.8rem;
    overflow: hidden;
}
.productPrice{
    position: absolute;
    right: 0.2rem;
    top: 6.45rem;
    color: red;
    font-size: 0.56rem;
}
</style>