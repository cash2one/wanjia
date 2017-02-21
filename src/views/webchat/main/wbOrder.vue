<template>
    <div style="font-size: 0.5rem;">
        <div class="wbProductTitle">
            <div>
                {{product.goodsName}}
            </div>
        </div>

        <div class="wbChooseDate">
            <div class="wbChooseDateTitle">
                选择日期
            </div>
            <div class="wbDateList">
                <div v-bind:class="[{wbDateItemSelected:date.date == selectedDateString} ,'wbDateItem']" v-for="date in listedDates" @click="selectDate(date)">
                    <div>
                        {{date.date.substring(5,10)}}
                    </div>
                    <div>
                        {{date.price}}
                    </div>
                </div>
                <div class="wbDateItem" @click="MoreCal"> 
                     <div>
                        更多
                    </div>
                    <div>
                        日期
                    </div>
                  
                </div>
            </div>

            
        </div>

         <div class="wbProductCat">
            <div class="wbProductCatItem" v-for="cat in productCat">
                <span class="catTitle">
                    {{cat.styleName}}
                </span>
                <span class="wbProductCatPrice">
                    单价￥{{cat.price}}
                </span>
                <counter class="wbCounter"  :maxCount="cat.stock" :model = "cat"  @decrement = "decrementCat"
                @increment="incrementCat"  ></counter>
            </div>
        </div>

        <div v-if="productService.length > 0" class="wbProductService">
            <div  class="wbProductOtherService">
                其他服务
            </div>
            <div class="wbProductCatItem" v-for="cat in productService">
                <span class="catTitle">
                    {{cat.serviceName}}
                </span>
                <span class="wbProductCatPrice">
                    单价￥{{cat.servicePrice}}
                </span>
                <counter class="wbCounter" :maxCount="cat.stock"  @decrement = "decrementService"
                @increment="incrementService"  :model = "cat" ></counter>
            </div>
        </div>

        <div class="wbContacter">
            <div class="wbContacterItem">
              <span class="catName">联系人</span>
              <input class="inputName" placeholder="姓名">
            </div>
            <div class="wbContacterItem">
              <span class="catName">手机号</span>
              <input class="inputPhone" placeholder="仅支持中国大陆手机号" type="tel">
            </div>
        </div>

        <div class="wbContacter" v-if="traveler > 0">
            <div>
                出行人信息

                <button type="" @click="chooseTraveler">选择出行人</button>
            </div>
            <div class="wbContacterItem" v-for="n in traveler">
              <span class="catName">成人</span>
              <input class="inputName" placeholder="姓名" :id="travelId(n)" >
            </div>
        </div>

        <div class="wbproductIntegral">
            <span class="catName">积分</span>
            <span class="wbUntegralNum">可用{{integral}}玩+积分抵￥{{integralDeduction}}</span>
            <input class="wbUseUntegral" type="checkbox">
        </div>

        <div class="wbproductPay">
            <div>
                选择支付方式
            </div>

            <div class="wbPayWay">
                <img src="./webchat.jpeg" alt="">
                <span>微信支付</span>
                <input type="radio" >
            </div>



        </div>

        <button class="wbPayButton" >{{amount}}元 <span>立刻支付></span></button>
        <cal v-show='showCal' :value='selectedDateString' :events="product.goodsCalendar" @dateSelected="selectedDate"
         :title="product.goodsName" @close="close" ></cal>
    </div>
</template>
<script>
import Vue from 'vue'
import productInfo from '../../../model/productInfo'
import counter from '../../../components/counter.vue'
import cal from '../../../components/CalendarPicker.vue'
import axios from 'axios'
 export default{
    data() {
      return {
       product:{},
       listedDates:[],
       selectedDateString:'',
       productCat:[],
       productService:[], //其他服务 
       integral:0,
       integralDeduction:0,
       showCal:false,
       selectedProductCat:[],
       selectedProductService:[],
       amount:0.00,
       traveler:localStorage.travel
      }
    },
    mounted(){
      this.product = this.$store.state.product
      this.integral = localStorage.integral
      this.integralDeduction = this.integral / 10
      let peoples = this.$store.state.choosedPeople
      if(!isEmpty(peoples)){
        for(var i = 0;i<peoples.length;i++){
            let ele = document.getElementById('travelId'+(i+1))
            ele.value = peoples[i].name
        }
      }
      if(!isEmpty(this.product)){
        this.listedDates = this.product.goodsCalendar.slice(0,4)
        this.productCat = this.product.goodsGuige
        this.productService = this.product.goodsInclude
      }
      else{
        let that = this
        let id = this.$route.params.id
        productInfo.getProducts(id).then(function(data){
            console.log(data)
                that.product = data.data
                that.listedDates =  that.product.goodsCalendar.slice(0,4)
                that.productCat = that.product.goodsGuige
                that.productService = that.product.goodsInclude
            },function(error){
                console.log(data.msg)
        })

    
      }
    },   
    components:{
        counter,
        cal
    },
    methods:{
        travelId(n){
            return "travelId" + n
        },
        selectDate(item){
            this.selectedDateString = item.date
            this.loadProductService(this.selectedDateString)
        },
        MoreCal(){
            this.showCal = !this.showCal
        },
        close(){
            this.showCal = !this.showCal
       },
       loadProductService(str){
         let url = 'https://app.playnet.cc/index/goods/get_price/dates/'+str+'/goodsid/' + this.product.id
         log(url)
         if(localStorage.key && typeof(localStorage.key) == 'string'){
             url = url + '/wjkey/' + localStorage.key
         }
         let that = this
         axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
               that.productCat = res.data
            }
            else{
                
            }
        })
        },
        selectedDate(str){
           this.loadProductService(str)
        },
        decrementCat(count,model){
            this.selectedProductCat[model.id] = count
            this.updateAmount()
        },
        incrementCat(count,model){
           this.selectedProductCat[model.id] = count
           
           this.updateAmount()
        },
        incrementService(count,model){
            this.selectedProductService[model.id] = count
            this.updateAmount()
        },
        decrementService(count,model){
            this.selectedProductService[model.id] = count
            this.updateAmount()
        },
        updateAmount(){
            var tmp = 0.0
 
            for(var cat in this.selectedProductCat){
                if(this.selectedProductCat[cat] > 0){
                    let c = this.productCat.find(function(ele){
                        return ele.id == cat
                    })
                    tmp += c.price * this.selectedProductCat[cat]
                }
            }
             for(var cat in this.selectedProductService){
                if(this.selectedProductService[cat] > 0){
                    let c = this.productService.find(function(ele){
                        return ele.id == cat
                    })
                    tmp += Number(c.servicePrice) * this.selectedProductService[cat]
                }
            }
            this.amount = tmp
        },
        chooseTraveler(){
            this.$router.push({ name: 'wbChooseTraveler'})
        }
    },
 }
</script>
<style>
.wbProductTitle{
    background: white;
    padding: 0.2rem 0.3rem;
}
.wbProductTitle div{
    padding-bottom: 0.15rem;
    border-bottom:  1px solid #aaa;
}

.wbChooseDate{
    background: white;
}
.wbChooseDateTitle{
    font-weight: bold;
    font-size: 0.45rem;
    margin-left: 0.2rem;
}
.wbDateList{
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 0.2rem;
    padding: 0.1rem 0.1rem;
    
}
.wbDateItem{
    border: 1px solid #aaa;
    width: 1.7rem;
    height: 1.2rem;
    line-height: 0.6rem;
    font-size: 0.4rem;
}
.wbDateItemSelected{
    border-color: red;
}
.wbMoreDate{
   padding: 0rem 0.3rem;
}
.wbProductCat{
    margin-top: 0.2rem;
    background: white;
    font-size: 0.45rem;
}
.wbProductCatItem{
    padding:0.3rem 0rem;
    padding-left: 0.5rem;
    padding-right: 0.2rem;
}
.catTitle{
    font-size: 0.45rem;
    width: 3rem;
}
.catName{
    font-size: 0.45rem;
    width: 3rem;
    font-weight: bold;
}
.wbProductCatPrice{
    color: orange;
    margin-left: 0.1rem;
    font-size: 0.36rem;
}
.wbCounter{
    width: 2rem;
    vertical-align: middle;
    height: 0.6rem ;
    line-height: 0.6rem ;
    float: right;
}
.wbProductService{

    background: white;
}
.wbProductOtherService{
    text-align: center;
    background: #eee;
    padding: 0.3rem 0rem;
    font-size: 0.43rem;
    color: #aaa;
}
.wbContacter{
    margin-top: 0.2rem;
    background: white;
}
.wbContacterItem{
    padding: 0.3rem 0rem;
    padding-left: 0.5rem;
    font-size: 0.45rem;
    line-height: 0.5rem;
}
.inputName{
    font-size: 0.4rem;
    margin-left: 0.4rem;
}
.inputPhone{
    font-size: 0.4rem;
    margin-left: 0.4rem;
}
.wbproductIntegral{
    background: white;
    margin-top: 0.2rem;
    padding: 0.3rem 0rem;
    padding-left: 0.5rem;
    padding-right: 0.3rem;
}
.wbUntegralNum{
    font-size: 0.4rem;
    margin-left: 0.9rem;
}
.wbUseUntegral{
    float: right;
    margin-top: 0.2rem;
}
.wbproductPay{
    border-top: 1px solid #555;
    background-color: white;
    padding-bottom: 3rem;
    padding-top: 0.4rem;
    padding-left: 0.24rem;
    font-size: 0.45rem;
}
.wbPayWay{
    padding: 0.3rem 0rem;
    vertical-align: middle;    
}
.wbPayWay img{
    width: 0.8rem;
    vertical-align: middle;    
}
.wbPayWay span{
    margin-left: 0.3rem;
}
.wbPayWay input{
    float: right;
    margin-top: 0.2rem;
    /*font-size: 1rem;*/
    margin-right: 0.3rem;
}
.wbPayButton{
    width: 100%;
    height: 1rem;
    color: white;
    background-color: #e24241;
    border: 0px;
    font-size: 0.35rem;
    position: fixed;
    bottom: 0px;
}
</style>