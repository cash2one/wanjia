<template>
    <div style="font-size: 0.6rem;">
        <div class="wbProductTitle">
            <div>
                {{product.goodsName}}
            </div>
        </div>

        <div class="wbChooseDate">
            <div class="wbChooseDateTitle">
                选择日期
            </div>
            <checker class="wbDateList" default-item-class="wbDateItem" selected-item-class="wbDateItemSelected"  :value="selectedDateString" type="radio">
                <checker-item  :value="date.date" v-for="date in listedDates" @on-item-click="selectDate">
                    <div>
                        {{date.date.substring(5,10)}}
                    </div>
                    <div>
                        ￥{{date.price}}
                    </div>
                </checker-item>
                <div class="wbDateItem"  @click="MoreCal"> 
                     <div>
                        更多
                    </div>
                    <div>
                        日期
                    </div>
                  
                </div>
            </checker>
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
              <input class="inputName" placeholder="姓名" v-model="contactName">
            </div>
            <div class="wbContacterItem">
              <span class="catName">手机号</span>
              <input class="inputPhone" placeholder="仅支持中国大陆手机号" type="tel" v-model="contactPhone">
            </div>
        </div>

        <div class="wbContacter" v-if="traveler > 0">
            
            <div class="wbContacterItem">
                <span class="catTitle">出行人信息</span>
                

                <button type="" @click="chooseTraveler" class="chooseTravelerBtn">选择出行人</button>
            </div>
            <div class="wbContacterItem" v-for="n in traveler">
              <span class="catName">成人</span>
              <input class="inputName" placeholder="姓名" :id="travelId(n)" >
            </div>
        </div>

        <div class="wbproductIntegral">
            <span class="catName">积分</span>
            <span class="wbUntegralNum">可用{{integral}}玩+积分抵￥{{integralDeduction}}</span>
            <input class="wbUseUntegral" type="checkbox" v-model="checkToUseIntegral">
        </div>

        <div class="wbproductPay">
            <div>
                选择支付方式
            </div>

            <div class="wbPayWay">
                <img src="static/img/order/webchat.jpeg" alt="">
                <span>微信支付</span>
                <input type="radio" checked="checked"  >
            </div>

        </div>

        <button class="wbPayButton" @click="createOrder" >{{amount}}元 <span>立刻支付</span></button>
        <cal v-show='showCal' :value='selectedDateString' :events="product.goodsCalendar" @dateSelected="selectedDate"
         :title="product.goodsName" @close="close" ></cal>
    </div>
</template>
<script>
import Vue from 'vue'
import {getProductInfo,getProductDateCat} from '../../store/service'
import counter from '../../components/counter.vue'
import cal from '../../components/CalendarPicker.vue'
import qs from 'qs'
import { Checker, CheckerItem } from 'vux'
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
       traveler:localStorage.travel,
       checkToUseIntegral:false,
       contactName:'',
       contactPhone:'',
       orderInfo:{}
      }
    },
    mounted(){
      if(!isWebchat()){
        login()
      }
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
         getProductInfo(id).then(function(data){
                console.log(data)
                that.product = data.data
                that.listedDates =  that.product.goodsCalendar.slice(0,4)
                that.productCat = that.product.goodsGuige
                that.productService = that.product.goodsInclude
                that.integral = that.product.integral
                that.integralDeduction = that.integral / 10
            },function(error){
                console.log(data.msg)
                this.$refs.scroller.disablePullup()
                 this.$vux.toast.show({
                   text: '网络错误，请重新再试',
                   position:"bottom",
                   type:'text'
                })
            })
      }
    },   
    components:{
        counter,cal,Checker, CheckerItem
    },
    methods:{
        travelId(n){
            return "travelId" + n
        },
        selectDate(item){
            this.selectedDateString = item
            this.loadProductService(this.selectedDateString)
        },
        MoreCal(){
            this.showCal = !this.showCal
        },
        close(){
            this.showCal = !this.showCal
       },
       loadProductService(str){
           let that = this
           getProductDateCat(str,this.product.id).then(function(data){
               that.productCat = data.data
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
        selectedDate(str){
           this.selectedDateString = str
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
            this.$router.push({ name: 'chooseTraveler'})
        },
    
        createOrder(){
            let url = 'https://app.playnet.cc/index/order/post'
            if(this.selectedDateString.length<=0){
                this.$vux.toast.show({
                   text: '你没有选择日期',
                   position:"bottom",
                   type:'text'
                })
                return
            }
            if(this.selectedProductCat.length <=0){
                this.$vux.toast.show({
                   text: '你没有选择商品',
                   position:"bottom",
                   type:'text'
                })
                return
            }
            if(this.contactName.length<=0){
                this.toast('联系人不能为空')
                this.$vux.toast.show({
                   text: '你没有选择日期',
                   position:"bottom",
                   type:'text'
                })
                return
            }
            if(this.contactPhone.length<=0){
                this.$vux.toast.show({
                   text: '你没有选择日期',
                   position:"bottom",
                   type:'text'
                })
                return
            }
            if(!/^1(3|4|5|7|8)\d{9}$/.test(this.contactPhone)){
                this.$vux.toast.show({
                   text: '你没有选择日期',
                   position:"bottom",
                   type:'text'
                })
                return
            }
            let travelerPeople = this.$store.state.choosedPeople
            if(this.traveler > 0){
                if(!travelerPeople || travelerPeople.length <= 0){
                    this.$vux.toast.show({
                        text: '你没有选择日期',
                        position:"bottom",
                        type:'text'
                    })
                   return
                }
                if(travelerPeople.length != this.traveler){
                    this.$vux.toast.show({
                        text: '出行人数量不符合商品数量',
                        position:"bottom",
                        type:'text'
                    })
                   return
                }
            }
            let count = 0
            let pros = []
            for(let item in this.selectedProductCat){
                let result = this.productCat.find(function(v){
                   return v.id == parseInt(item)
                })
                let pro = result.id+'-'+this.selectedProductCat[item]+'-'+result.price
                count = count + this.selectedProductCat[item]
                pros.push(pro)
            }
            let travels = []
            for(let tra of travelerPeople){
                let t = tra.name + '-' + tra.identityCard
                travels.push(t)
            }
            let services = []
            for(let ser in this.selectedProductService){
                let i = this.productService.find(function(v){
                   return v.id == parseInt(ser)
                })
                let s = i.id+'-'+this.selectedProductService[ser]+'-'+i.servicePrice
                services.push(s)
            }
            let inte = 0
            let deductPrice = 0
            let totalPrice = this.amount
            if(this.integral>0){
                if(this.checkToUseIntegral){
                    inte = this.integral
                    deductPrice = this.integralDeduction
                    totalPrice = totalPrice - deductPrice
                }
            }

            this.orderInfo = {
                projectId:this.product.id,
                date:this.selectedDateString,
                contactName:this.contactName,
                contactPhone:this.contactPhone,
                count:count,
                products:pros,
                travelers:travels,
                integral:inte,
                deductible:deductPrice,
                services:services,
                wjkey:localStorage.key,
                price:totalPrice,
                orderId:0,
                orderNum:''
            }
            let that = this
            log(this.orderInfo)
            
            axios.post(url,qs.stringify(this.orderInfo)).then(response=>{ //目前不能添加，只能个性，不知道为什么
                var res = response.data;
                if(res.ret_code == 0) {
                    log(res)
                    that.orderInfo.orderId = res.orderId
                    that.orderInfo.ordrerNum = res.orderNumber
                    that.pay()
                }
                else{
                    
                }
            })

        },
        pay(){
            console.log('use this to pay')
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
    padding-bottom: 0.2rem;
}
.wbChooseDateTitle{
    font-weight: bold;
    font-size: 0.6rem;
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
    width: 2.8rem;
    height: 2.2rem;
    line-height: 1.04rem;
    font-size: 0.6rem;
}
.wbDateItemSelected{
    border-color: red;
     background: #ffffff url(../../../static/img/order/check_selected.png) no-repeat right bottom;
}

.wbProductCat{
    margin-top: 0.5rem;
    background: white;
    font-size: 0.6rem;
}
.wbProductCatItem{
    /*padding:0.3rem 0rem;*/
    padding-left: 0.5rem;
    padding-right: 0.2rem;
    height: 1.6rem;
    line-height: 1.6rem;
}
.catTitle{
    font-size: 0.6rem;
    width: 3rem;
}
.catName{
    font-size: 0.6rem;
    width: 3rem;
    font-weight: bold;
}
.wbProductCatPrice{
    color: orange;
    margin-left: 0.1rem;
    font-size: 0.5rem;
}
.wbCounter{
    width: 3rem;
    /*vertical-align: middle;*/
    margin-top: 0.3rem;
    height: 1rem ;
    line-height: 0.9rem ;
    float: right;
    font-size: 0.7rem;
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
.chooseTravelerBtn{
    float: right;
    background: transparent;
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    font-size: 0.5rem;
}
.wbContacter{
    margin-top: 0.4rem;
    background: white;
}
.wbContacterItem{
    padding: 0.3rem 0rem;
    padding-left: 0.5rem;
    font-size: 0.45rem;
    line-height: 0.5rem;
    height: 1.5rem;
    line-height: 1rem;
}
.inputName{
    font-size: 0.55rem;
    margin-left: 0.4rem;
}
.inputPhone{
    font-size: 0.55rem;
    margin-left: 0.4rem;
}
.wbproductIntegral{
    background: white;
    margin-top: 0.2rem;
    padding: 0.3rem 0rem;
    padding-left: 0.5rem;
    padding-right: 0.3rem;
    height: 1.5rem;
    line-height: 1rem;
}
.wbUntegralNum{
    font-size: 0.5rem;
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
    font-size: 0.6rem;
}
.wbPayWay{
    padding: 0.3rem 0rem;
    vertical-align: middle;    
}
.wbPayWay img{
    width: 1.5rem;
    vertical-align: middle;    
}
.wbPayWay span{
    margin-left: 0.3rem;
}
.wbPayWay input{
    float: right;
    margin-top: 0.5rem;
    /*font-size: 1rem;*/
    margin-right: 0.3rem;
}
.wbPayButton{
    width: 100%;
    height: 1.5rem;
    color: white;
    background-color: #e24241;
    border: 0px;
    font-size: 0.65rem;
    position: fixed;
    bottom: 0px;
}
</style>