<template>
    <div style="font-size: 0.5rem;">
        <div class="orderProductDetail">
            <img :src="orderInfo.goodsThumb" alt="">
            <div class="orderProductInfoDetail">
                <div>
                    {{orderInfo.goodsName}}
                </div>
                <div class="orderProductInfoDetails">数量: {{orderInfo.goodsNums}}</div>
                <div class="orderProductInfoDetails">总价: {{orderInfo.orderAmount}}</div>
            </div>
        </div>
        <div class="orderProductTag">
            <div>
                
            </div>
            <img class="orderFeatureImg" src="../../../static/img/select_green.png" alt="">
            <span class="orderFeatureSpan">{{canRefund}}</span>
        </div>
        <div class="mainOrderInfo">
            <div class="orderToken">
                <div class="tokenTitle">
                    <div>
                        <div>玩+券</div>
                       <div style="font-size: 0.37rem;">有效期至: {{orderInfo.goodsDeadline}}</div>
                    </div>
                    <button class="tokenTitleHandle" type="" @click = "handleOrder"
                     v-if="!(orderInfo.isCancel == 1 && (orderInfo.status == 1 || orderInfo.status == 2))" >{{orderAction}}</button>
                </div>
                <div class="orderTokens">
                    <div v-for="tos of totenTitle">
                        <div>
                            {{tos}}
                        </div>
                        
                        <div class="tokenDetail" v-for="t in tokens[tos]">
                            <span>密码</span>
                            <span >{{t.codes}}</span>
                            <span style="float: right; color: green;font-size: 0.4rem;">{{tokenStatus(t)}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="orderContactInfo">
                <div class="orderDetailInfoTitle">
                    预定信息
                </div>
                <div class="orderDetailInfoTitleContent">
                    联系人: {{orderInfo.contactName}}
                </div>
                <div class="orderDetailInfoTitleContent">
                    联系电话: {{orderInfo.contactPhone}}
                </div>
            </div>

             <div class="orderContactInfo">
                <div class="orderDetailInfoTitle">
                    其他信息
                </div>
                <div class="orderDetailInfoTitleContent">
                    订单编号: {{orderInfo.orderNumber}}
                </div>
                <div class="orderDetailInfoTitleContent">
                    预定日期: {{orderInfo.create_time}}
                </div>
            </div>
        </div>
        <div class="orderServerInfo">
            <div class="orderDetailInfoTitle">
                商家信息
            </div>
            <div class="orderServerInfoContent">
                <div style="width: 80%;">
                    <div style="color: #444;margin-top: 0.1rem;margin-bottom: 0.15rem;">
                        {{orderInfo.businessName}}
                    </div>
                    <div>
                        {{orderInfo.address}}
                    </div>
                </div>
                <div class="orderServerInfoPhone">
                    <img  src="../../../static/img/phone_green.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast } from 'mint-ui'
import axios from 'axios'
 export default{
    data() {
      return {
        orderInfo:{},
        totenTitle:[],
        tokens:{}
      }
    },
    mounted(){
       if(!isWebchat()){
        login()
       }
       let id = this.$route.params.id
       let url = 'https://app.playnet.cc/index/order/detail/wjkey/' + localStorage.key +"/id/"  + id
       log(url)
       let that = this
       axios.get(url).then(response=>{
        var res = response.data;
        if(res.ret_code == 0) {
            that.orderInfo = res.data
            let codes = that.orderInfo.codes
            let temp = []
            let tmpToken = []
            for(var c of codes){
                if(temp.indexOf(c.styleName) < 0){
                    temp.push(c.styleName)
                }
                if(tmpToken[c.styleName]){
                  tmpToken[c.styleName].push(c)
                }
                else{
                    tmpToken[c.styleName] = []
                    tmpToken[c.styleName].push(c)
                }
            }
            that.totenTitle = temp
            that.tokens = tmpToken
        }
        else{
            
        }
    })

    },   
    components:{
     
    },
    methods:{
        tokenStatus(token){
            if(this.orderInfo.status == 2 || this.orderInfo.status == 4 || this.orderInfo.status == 5){
                switch (token.isUse) {
                case 0:
                    return '未消费'
                    break;
                case 1:
                    return '已消费'
                    break;
                case -1:
                    return '不可用'
                    break;
                default:
                    break;
              }
            }
            else{
                return '不可用'
            }
        },
        handleOrder(){
            if(this.orderAction == '去付款'){
                this.$router.push({ name: 'wbPayOrder', params: { id:this.orderInfo.id }})
            }
        }
    },
    computed:{
        canRefund(){
            return this.orderInfo.isCancel == 0 ? '不可退款' : '申请退款'
        },
        orderAction(){
            switch (this.orderInfo.status) {
                case 0:
                    return '去付款'
                    break;
                case 4:
                    return '去评价'
                    break;
                case 7:
                    return '退款中'
                    break;
                case 8:
                    return '退款完成'
                    break;
                case 1:
                    this.orderInfo.isCancel == 0 ? '不可退款' : '申请退款'
                    break;
                case 2:
                    this.orderInfo.isCancel == 0 ? '不可退款' : '申请退款'
                    break;
                default:
                    break;
            }
        }
    }
 }
</script>
<style>
.orderProductDetail{
    padding: 0.3rem 0.3rem;
    background: white;
    width: 100%;
    display: flex;
}
.orderProductDetail img{
    width: 2rem;
    height: 2rem;
    margin-right: 0.2rem;
}
.orderProductInfoDetail{
    margin-top: -0.05rem;
    font-size: 0.45rem;
}
.orderProductInfoDetails{
   font-size: 0.42rem;
   margin-top: 0.1rem;
   color: #aaa;
}
.orderProductTag{
    background: white;
    padding: 0rem 0.3rem;
    padding-bottom: 0.2rem;
    vertical-align: middle;
}
.orderFeatureImg{
    width: 0.5rem;
    vertical-align: middle;
}
.orderFeatureSpan{
    font-size: 0.45rem;
    color: green;
    vertical-align: middle;
}
.orderProductTag div{
    height: 1px;
    background: #ccc;
    margin-bottom: 0.15rem;
    
}

.mainOrderInfo{
    padding: 0.5rem 0.3rem;
}

.tokenTitle{
    background: rgba(0, 222, 0, 0.9);
    display: flex;
    padding: 0.2rem 0.3rem;
    font-size: 0.43rem;
    color: white;
    justify-content: space-between;
}
.tokenTitleHandle{
    color: white;
    border: 1px solid white;
    background: transparent;
    margin: 0.25rem 0rem;
    padding: 0.15rem 0.4rem;
    border-radius: 0.1rem;
    font-size: 0.4rem;
}
.orderTokens{
    background: white;
    padding: 0.3rem 0.3rem;
    font-size: 0.45rem;
}
.tokenDetail {
    margin-top: 0.15rem;
}
.orderContactInfo{
    padding: 0.3rem 0.3rem;
    margin-top: 0.3rem;
    background: white;
    font-size: 0.43rem;
    color: #999;
}
.orderDetailInfoTitle{
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.2rem;
    margin-bottom: 0.1rem;
}
.orderDetailInfoTitleContent{
    padding-top: 0.1rem;
}
.orderServerInfo{
    background: white;
    padding: 0.3rem 0.3rem;
    font-size: 0.43rem;
    color: #aaa;
}
.orderServerInfoContent{
    display: flex;
    
}
.orderServerInfoPhone{
    text-align: center;
    width: 20%;
    line-height: 2rem;
}
.orderServerInfoPhone img{
    width: 0.6rem;
    
}
</style>