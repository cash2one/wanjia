<template>
    <div class="mainProductListDiv">
       <div class="productsTitle">

              <tab :line-width=2 active-color='#fc378c' v-model="index">
                 <tab-item class="productCatTitle"  :selected="index == 0" @click="index = 0" >运动休闲</tab-item>
                 <tab-item class="productCatTitle"  :selected="index == 1" @click="index = 1" >旅游商务</tab-item>
                 <tab-item class="productCatTitle"  :selected="index == 2" @click="index = 2" >社交活动</tab-item>
                 <tab-item class="productCatTitle"  :selected="index == 3" @click="index = 3" >定制服务</tab-item>

             </tab>
         </div>
       

            <div class="productList">
                <div class="catProductList">
                    <div v-bind:class="[{catProductListItemSelected:item == selectedCat1} ,'catProductListItem']" v-for="item in cat1" @click="selectCat(item,$event)">
                        <img :src="item.thumb" alt="">
                        <span class="catProductListItemTitle">{{item.fullName}}</span>
                    </div>
                </div>
                <div  class="catProductListContent" ref="cat1Scroll">
                   <div v-for="item in cat1">
                        <div class="catProductListCatTitle">
                            {{item.fullName}}
                        </div>
                        <div>
                            <div  @click="gotoProduct(pros)" class="productItemClass" v-for="pros in products1[item.id]">
                                <img class="productImg" :src="pros.goodsThumb" alt="">
                                <div class="divLike">
                                    <img src="static/img/main/like.png" alt="">
                                    <span>{{pros.zan}}</span>
                                </div>
                                <div class="divSelled">
                                    <img src="static/img/product/selled.png" alt="">
                                    <span>已售 {{pros.goodsSellNums}}</span>
                                </div>
                                <img class="productImgServiceLogo" :src="pros.thumb" alt="">
                                <span class="productServiceName">{{pros.businessName}}</span>
                                <span class="productTitle">{{pros.goodsName}}</span>
                                <span class="productPrice"> <span style="font-size: 0.4rem" >￥</span> {{pros.goodsPrice}}</span>
                                <div class="productComment">
                                    <div  v-if="pros.goodsScore <= 0"  class="productCommentNew">
                                        <img src="static/img/product/new_product.png" alt="">
                                        <span>新品推荐</span>
                                    </div>
                                    <div v-else class="productCommentScore">
                                        <img src="static/img/product_score.png" alt="">
                                        <span class="productCommentScoreSpan">评分: {{pros.goodsScore}} </span>
                                        <span class="productCommentScoreTag"> {{getTagFromScore(pros.goodsScore)}} {{pros.tag}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
   




       
       
     </div>
</template>
<script>
import { Tab, TabItem,Scroller} from 'vux'

 import {getProductList} from '../../store/service'
  export default {
    data() {
      return {
        index:0,
        cat1:{},
        cat1Height:{},
        selectedCat1:{},
        cat2:{},
        cat2Height:{},
        selectedCat2:{},
        cat3:{},
        cat3Height:{},
        selectedCat3:{},
        cat4:{},
        cat4Height:{},
        selectedCat4:{},
        products1:{},
        products2:{},
        products3:{},
        products4:{},
        barHeight:0,
        cellHeight:0
      }
  },
  mounted(){
      let selectedId = this.$route.params.id
      this.index = (selectedId - 1)
      this.loadData(selectedId.toString())
      this.$nextTick(() => {
        this._initScroll()
      })
        
  },
  methods:{
      selectCat(item,event){
          console.log(event.currentTarget)
          let ele = event.currentTarget
          let offset = 0
          switch (this.index) {
              case 0:
                   this.selectedCat1 = item
                    offset = this.cat1Height[item.id]
                   document.body.scrollTop = offset;
                  break;
              case 1:
                   this.selectedCat2 = item
                     offset = this.cat2Height[item.id]
                   document.body.scrollTop = offset;
                  break;
             case 2:
                   this.selectedCat3 = item
                     offset = this.cat3Height[item.id]
                   document.body.scrollTop = offset;
                  break;
             case 3:
                   this.selectedCat4 = item
                   offset = this.cat4Height[item.id]
                   document.body.scrollTop = offset;
                  break;
              default:
                  break;
          }
      },
      loadData(cat){
        let that = this
        getProductList(cat).then(function(data){
                let cats =  data.data.category
                let catExist = []
                for(let c of cats){
                    if(data.data[c.id].length > 0){
                        catExist.push(c)
                    }
                }
                let products = {}
                for(let c of catExist){
                    products[c.id] = data.data[c.id]
                }
                switch (cat) {
                    case '1':
                        that.cat1 = catExist
                        that.selectedCat1 = catExist[0]
                        that.products1 = products
                        break;
                    case '2':
                        that.selectedCat2 = catExist[0]
                        that.cat2 = catExist
                        that.products2 = products
                        break;
                    case '3':
                        that.selectedCat3 = catExist[0]
                        that.cat3 = catExist
                        that.products3 = products
                        break;
                    case '4':
                        that.selectedCat4 = catExist[0]
                        that.cat4 = catExist
                        that.products4 = products
                        break;
                    default:
                        break;
                }
            },function(error){
                console.log(data.msg)
                 this.$refs.scroller.disablePullup()
                 this.$vux.toast.show({
                   text: '网络错误，请重新再试',
                   position:"bottom",
                   type:'text'
                })
            })

        
      },
      getTagFromScore(score){
        if(score == 5.0){
            return "完美"
        }
        else if(score < 5.0 && score >= 4.7){
            return "完美"
        }
        else if(score < 4.7 && score >= 4.5){
            return "很好"
        }
        else if(score < 4.5 && score >= 4.0){
            return "不错"
        }
      },
      gotoProduct(pro){
        this.$router.push({ name: 'webchatProduct', params: { id:pro.id }})
      },
      _initScroll(){
        // document.body.scrollTop
         window.onscroll = function(e){
             console.log(document.body.scrollTop)
         }
         let that = this
         setTimeout(function() {
             if(that.barHeight == 0 || that.cellHeight == 0){
                 that.barHeight = document.getElementsByClassName('catProductListCatTitle')[0].clientHeight;
                 that.cellHeight = document.getElementsByClassName('productItemClass')[0].clientHeight;
            }
            let previousHeight = 0
            if(!isEmpty(that.cat1) &&isEmpty(that.cat1Height)){ 
                for(var a of that.cat1){
                     that.cat1Height[a.id] = previousHeight
                    previousHeight += that.barHeight
                    previousHeight += that.products1[a.id].length * that.cellHeight
                }
            }
            if(!isEmpty(that.cat2) &&isEmpty(that.cat2Height)){
                for(var a of that.cat2){
                    previousHeight += that.barHeight
                    previousHeight += that.products2[a.id].length * that.cellHeight
                    that.cat2Height[a.id] = previousHeight
                }
            }
            if(!isEmpty(that.cat3) &&isEmpty(that.cat4Height)){
                for(var a of that.cat3){
                    previousHeight += that.barHeight
                    previousHeight += that.products3[a.id].length * that.cellHeight
                    that.cat3Height[a.id] = previousHeight
                }
            }
            if(!isEmpty(that.cat4) &&isEmpty(that.cat4Height)){
                for(var a of that.cat4){
                    previousHeight += that.barHeight
                    previousHeight += that.products4[a.id].length * that.cellHeight
                    that.cat4Height[a.id] = previousHeight
                }
            }
         }, 100);
         console.log(this.cat1Height)
      }
  },
  components:{
      Tab, TabItem,Scroller
  },
  watch:{
      index:function(val){
          switch (val) {
             case 0:
                  if(isEmpty(this.cat1)){
                      this.loadData('1')
                  }
                  break;
                  break;
             case 1:
                  if(isEmpty(this.cat2)){
                      this.loadData('2')
                  }
                  break;
            case 2:
                  if(isEmpty(this.cat3)){
                      this.loadData('3')
                  }
                  break;
            case 3:
                  if(isEmpty(this.cat4)){
                      this.loadData('4')
                  }
                  break;
              default:
                  break;
          }
        this.$nextTick(() => {
            this._initScroll()
        })
      }
  }
  // props: ['selected']
}
</script>
<style>
    .productsTitle{
    background: white;
    z-index: 102;
     height: 2rem;
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
.productList{
    position: absolute;
    top: 2rem;
}
.catProductList{
    height: 2rem;
    display: flex;
    font-size: 0.3rem;
    overflow: scroll;
    justify-content: center;
    background: white;
    width: 100%;
    position: fixed;
    z-index: 100;
}

.catProductListContent{
    margin-top: 2rem;
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
    width: 1.5rem;
    font-size: 0.32rem;
    height: 0.4rem;
    line-height: 0.4rem;
}
.divSelled img{
    width: 0.3rem;
    margin-top: -0.05rem;
    vertical-align: middle;
}
.divSelled span{
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
    .vux-swiper{
        height: 95vh !important;
    }
    .vux-swiper-item{
        overflow: scroll;
    }
    .catProductListCatTitle{
        text-align: center;
        font-size: 0.65rem;
        padding: 0.1rem 0rem;
    }
    .productComment{
        font-size: 0.33rem;
        margin-bottom: 0.1rem;
    }
    .productCommentNew img{
        width: 0.6rem;
    }
    .productCommentNew{
        color: orange;
    }
    .productCommentScore img{
      width: 0.37rem;
      vertical-align: middle;
    }
    .productCommentScoreSpan{
        color: orange;
    }
    .productCommentScoreTag{
        color: #aaa;
    }
</style>