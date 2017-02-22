<template>
    <div style="font-size: 0.5rem;">
        <div class="orderProductInfo">
            <img :src="orderInfo.goodsThumb" alt="">
            <div class="orderProductInfoDetail">
                <div>
                    {{orderInfo.goodsName}}
                </div>
                <div class="orderProductInfoDetails">
                    数量: {{orderInfo.goodsNums}}
                </div>
                <div class="orderProductInfoDetails">
                    总价: {{orderInfo.orderAmount}}
                </div>
            </div>
        </div>
        <div class="orderProductTag">
            <div>
                
            </div>
            <span>{{canRefund}}</span>
        </div>
        <div class="mainOrderInfo">
            <div class="orderToken">
                <div class="tokenTitle">
                    <div>
                        <div>玩+券</div>
                       <div style="font-size: 0.37rem;">有效期至: {{orderInfo.goodsDeadline}}</div>
                    </div>
                    <button class="tokenTitleHandle" type="" v-if="!(orderInfo.isCancel == 1 && (orderInfo.status == 1 || orderInfo.status == 2))" >{{orderAction}}</button>
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
                <div>
                    预定信息
                </div>
                <div>
                    联系人: {{orderInfo.contactName}}
                </div>
                <div>
                    联系电话: {{orderInfo.contactPhone}}
                </div>
            </div>

             <div class="orderOtherInfo">
                <div>
                    其他信息
                </div>
                <div>
                    订单编号: {{orderInfo.orderNumber}}
                </div>
                <div>
                    预定日期: {{orderInfo.create_time}}
                </div>
            </div>
        </div>
        <div class="orderServerInfo">
            <div>
                商家信息
            </div>
            <div>
                <div>
                    <div>
                        {{orderInfo.businessName}}
                    </div>
                    <div>
                        {{orderInfo.address}}
                    </div>
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
.orderProductInfo{
    padding: 0.3rem 0.3rem;
    background: white;
    width: 100%;
    display: flex;
}
.orderProductInfo img{
    width: 2rem;
    height: 2rem;
    margin-right: 0.2rem;
}
.orderProductInfoDetail{
    margin-top: -0.15rem;
    font-size: 0.47rem;
}
.orderProductInfoDetails{
   font-size: 0.42rem;
   margin-top: 0.13rem;
   color: #aaa;
}
.orderProductTag{
    background: white;
    padding: 0rem 0.3rem;
    padding-bottom: 0.2rem;
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
    
}
.tokenDetail {
    margin-top: 0.15rem;
}
</style>