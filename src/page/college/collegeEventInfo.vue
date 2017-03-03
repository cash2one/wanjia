<template>
    <div class="eventDiv"  >

        <div class="eventHead">
            <img :src="event.goodsThumb" alt="">
            <div class="eventTime">
                活动时间：{{eventTime}}
            </div>
            <div class="eventTitle">
                {{event.goodsName}}
            </div>
            <div class="eventPrice">
                <span style="font-size: 0.5rem">￥</span> <span style="font-size: 0.7rem">{{event.goodsPrice}}</span>
            </div>
            <button class="applyEvent" type="" @click="joinEvent">我要报名</button>
        </div>
        <div class="eventInfo">
            <div class="publisher">
                <img :src="publisher.thumb" alt="">
                <span>{{publisher.businessName}}</span>
                <button @click="joinEvent" >+    关注</button>
            </div>
            <div style="display: flex;justify-content: center">
                <div class="line_left">  </div>
                <div class="line_text">
                    详情区
                </div>
                <div class="line_right"></div>
            </div>
            <div class="eventImages">
               <img :src="img.pic" v-for="img in event.goodsImg" alt="">
             </div>
             <div class="eventStatus">
                 <span class="eventFans">  <img src="static/img/college/fans.png" alt=""> {{publisher.fans}}粉丝</span>
                 <span class="eventLikers" > <img src="static/img/college/like.png" alt="">  {{event.zan}}喜欢</span>
                 <span class="eventShare">  <img src="static/img/college/share.png" alt=""> {{event.share}}分享</span>
             </div>
             <div style="display: flex;justify-content: center">
                 <div class="line_left">  </div>
                <div class="line_text">
                   评论
                </div>
                <div class="line_right"></div>
             </div>
        </div>
        <div class="comment">
            <div v-for="comment in event.comments" class="commentCell">
                <img class="commenterHead" :src="comment.avatar" alt="">
                <span class="commenter">{{comment.userName}}</span>
                <div class="commentContent">
                    {{comment.content}}      
                </div>
                <div class="commentTime">
                   {{comment.create_time}}  
                </div>
                <div class="commentIcon">
                    <span class="commentZan">
                         <img src="static/img/college/praise.png" alt="">
                        <span style="font-size: 0.6rem;position: relative;top: -0.1rem;left: 0rem">{{comment.zan}}</span>
                      </span>
                   <img  style="width: 0.6rem;height: 0.6rem;" src="static/img/college/comment.png" alt="">
                </div>
                <div class="subComment" v-if="comment.list">
                    <div v-for="com in comment.list">
                        <span style="color:green" >{{com.fuserName}}</span>
                        <span v-if="com.luserName" >回复</span>
                        <span style="color:green" v-if="com.luserName" >{{com.luserName}}</span>
                        <span>:{{com.content}}</span>
                    </div>
                </div>
                <div class="commentLine"></div>
            </div>
        </div>
        <openApp></openApp>
    </div>
</template>
<script>
 import Vue from 'vue'

 import openApp from '../../components/openApp.vue'
 import {getCollegeEventInfo} from '../../store/service'
export default {
    data() {
      return {
          event:{},
          publisher:{},
          loading:true
      }
    },
    mounted(){
        this.loadMore()
    },
     components: {
        openApp
    },
    methods:{
        loadMore(){
            var that = this
            //this.loading = true
            //这个页面不做下拉刷新了
            var pageIndex = 0
            let id = this.$route.params.id
            if(!isEmplyObject(this.event)){
                pageIndex = that.event.comments.length / 15
            }
            if(pageIndex == 0){
                getCollegeEventInfo(id,pageIndex).then(function(data){
                    that.event = data.data
                    that.loading = false
                    that.publisher = that.event.goodsService
                    document.title = that.event.goodsName
                },function(error){
                    console.log(data.msg)
                })
            }
            else{
                
            }
           
        },
        joinEvent(){
            this.$vux.toast.show({
                text: '请打开APP',
                position:"bottom",
                type:'text'
            })
        },
        
    },
    computed:{
        eventTime(){
            if (this.event.goodsStart != undefined){
                let startDate = new Date(this.event.goodsStart.replace(/-/g,"/"))
                let endDate = new Date(this.event.goodsEnd.replace(/-/g,"/"))
                if(startDate == endDate){
                    return startDate.Format('MM月-dd日')
                }
                else{
                    return startDate.Format('MM月-dd日') + ' - ' + endDate.Format('MM月-dd日')
                }
            }
          
            return ''
        }
    }

}

function isEmplyObject(obj){
   
  for (var key in obj) {
    return false;
  }
  return true;

}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "H+": this.getHours(),  
        "m+": this.getMinutes(),  
        "s+": this.getSeconds(), 
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds()  
    };
    var year = this.getFullYear();
    var yearstr = year + '';
    yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;
    
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

</script>
<style>
div.eventDiv{
    font-size: 0.6rem;
}
div.eventHead{
    background: white;
}   
div.eventHead img{
    width: 100%;
    height: 8.3rem;
}
div.eventTime{
    position: absolute;
    top: 7rem;
    padding-left: 0.5rem;
    background: #444;
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    color: white; 
    font-size: 0.5rem;
    opacity: 0.8;
} 
div.eventTitle{
    padding:0.1rem 0.3rem;
    font-size: 0.6rem;
    font-weight: bold;
}
div.eventPrice{
    color: #c40000;
    padding-left: 0.3rem;
    padding-bottom: 0.2rem;
}

button.applyEvent{
    position: absolute;
    right: 0.5rem;
    top: 8.8rem;
    width: 2.5rem;
    font-size: 0.5rem;
    border: 0px;
    border-radius: 0.1rem;
    color: white;
    padding: 0.15rem 0.02rem;
    background: #14CC81;
    height: 1rem;
    line-height: 0.2rem;
}
div.eventInfo{
    margin-top: 0.5rem;
    background: white;
}
div.publisher{
    border-bottom: 1px solid #ddd;
    padding: 0.5rem 0.5rem;
    padding-bottom: 0.3rem;
}
div.publisher img{
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 1.2rem;
    margin-right: 0.3rem;
}   
div.publisher span{
    position: relative;
    top: -0.7rem;
    font-size: 0.55rem;
}
div.publisher button{
    border: 1px solid #14CC81;
    border-radius: 0.1rem;
    float: right;
    height: 1rem;
    font-size: 0.5rem;
    margin-top: 0.3rem;
    background: white;
    color: green;
    width: 2.5rem;
    line-height: 1rem;
}
div.line_left{
    width: 1.5rem;
    display: inline-block;
    height: 1px;
    background: green;
    margin-top: 0.5rem;
}
div.line_text{
    display: inline-block;
    font-size: 0.5rem;
    margin-top: 0.2rem;
    padding: 0rem 0.1rem;
    color: #999;
}
div.line_right{
    width: 1.5rem;
    display: inline-block;
    height: 1px;
    background: green;
    margin-top: 0.5rem;
}
div.eventImages{
    padding: 0rem 0.4rem;
    margin-top: 0.5rem;
}
div.eventImages img{
    width: 100%;
    height: 8rem;
    margin-bottom: 0.2rem;
}
div.eventStatus{
    padding: 0.6rem 1.5rem 0.4rem 1.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.5rem;
}
div.eventStatus span{
    width: 2rem;
    text-align: center;
}
div.eventStatus span img{
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 1.2rem;
}
div.comment{
    margin-top: 0.5rem;
    background: white;
    margin-bottom: 2rem;
}
div.commentCell{
    padding: 0.4rem 0.4rem 0.1rem 0.4rem;
}
.commenterHead{
    width: 1.2rem;
    height: 1。2rem;
    border-radius: 1rem;
    margin-right: 0.1rem;
    position: relative
}
span.commenter{
    position: relative;
    top: -0.35rem;
    font-size: 0.55rem;
}
div.commentContent{
    margin-left: 1.3rem;
    font-size: 0.6rem;
}
div.commentTime{
    margin-left: 1.3rem;
    margin-top: 0.1rem;
    font-size: 0.5rem;
}
div.commentIcon{
    text-align: right;
    position: relative;
    top: -0.3rem;
}

span.commentZan img{
     width: 0.6rem;
    height: 0.6rem;
   
}
div.subComment{
    background: #ddd;
    font-size: 0.5rem;
    margin-left: 1.3rem;
    padding:0.05rem 0.15rem;
}
div.subComment div{
    margin-top: 0.05rem;
    margin-bottom: 0.05rem;
}
div.commentLine{
    background: #ddd;
    height: 1px;
    margin-top: 0.3rem;
}

</style>