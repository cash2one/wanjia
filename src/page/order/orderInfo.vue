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
            <img class="orderFeatureImg" src="static/img/main/select_green.png" alt="">
            <span class="orderFeatureSpan">{{canRefund}}</span>
        </div>
        <div class="mainOrderInfo">
            <div class="orderToken">
                <div class="tokenTitle">
                    <div>
                        <div>玩+券</div>
                       <div style="font-size: 0.5rem;">有效期至: {{orderInfo.goodsDeadline}}</div>
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
                            <span style="float: right; color: green;font-size: 0.55rem;">{{tokenStatus(t)}}</span>
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
                <div style="width: 85%;">
                    <div style="color: #444;margin-top: 0.2rem;margin-bottom: 0.25rem;">
                        {{orderInfo.businessName}}
                    </div>
                    <div>
                        {{orderInfo.address}}
                    </div>
                </div>
                <div class="orderServerInfoPhone">
                    <img  src="static/img/product/btn_phone.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getOrderInfo} from '../../store/service'
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
       let that = this
       getOrderInfo(id).then(function(data){ 
            that.orderInfo = data.data
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
        },function(error)
        {
            console.log(data.msg)
            this.$vux.toast.show({
                text: '网络错误，请重新再试',
                position:"bottom",
                type:'text'
            })
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
                this.$router.push({ name: 'payOrder', params: { id:this.orderInfo.id }})
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
    padding: 0.4rem 0.4rem;
    background: white;
    width: 100%;
    display: flex;
}
.orderProductDetail img{
    width: 3rem;
    height: 3rem;
    margin-right: 0.4rem;
}
.orderProductInfoDetail{
    margin-top: -0.05rem;
    font-size: 0.6rem;
}
.orderProductInfoDetails{
   font-size: 0.5rem;
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
    width: 0.6rem;
    vertical-align: middle;
}
.orderFeatureSpan{
    font-size: 0.55rem;
    color: green;
    vertical-align: middle;
}
.orderProductTag div{
    height: 1px;
    background: #ccc;
    margin-bottom: 0.15rem;
    
}

.mainOrderInfo{
    padding: 0.7rem 0.5rem;
}

.tokenTitle{
    background: rgba(0, 222, 0, 0.9);
    display: flex;
    padding: 0.3rem 0.4rem;
    font-size: 0.55rem;
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
    font-size: 0.55rem;
}
.orderTokens{
    background: white;
    padding: 0.3rem 0.3rem;
    font-size: 0.6rem;
}
.tokenDetail {
    margin-top: 0.15rem;
}
.orderContactInfo{
    padding: 0.3rem 0.3rem;
    margin-top: 0.3rem;
    background: white;
    font-size: 0.55rem;
    color: #999;
}
.orderDetailInfoTitle{
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.2rem;
    margin-bottom: 0.1rem;
    font-size: 0.6rem;
}
.orderDetailInfoTitleContent{
    padding-top: 0.1rem;
    font-size: 0.55rem;
}
.orderServerInfo{
    background: white;
    padding: 0.3rem 0.3rem;
    font-size: 0.55 rem;
    color: #aaa;
}
.orderServerInfoContent{
    display: flex;
    
}
.orderServerInfoPhone{
    text-align: center;
    width: 15%;
    margin-top: 0.2rem;
    border-left: 1px solid #aaa;
    margin-bottom: 0.2rem;
}
.orderServerInfoPhone img{
    width: 0.7rem;
   padding-top: 0.4rem;
}
</style>