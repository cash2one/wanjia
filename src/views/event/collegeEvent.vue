<template>
    <div class="eventDiv"  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" >

        <div class="eventHead">
            <img :src="event.goodsThumb" alt="">
            <div class="eventTime">
                活动时间：{{eventTime}}
            </div>
            <div class="eventTitle">
                {{event.goodsName}}
            </div>
            <div class="eventPrice">
                <span style="font-size: 0.3rem">￥</span> <span style="font-size: 0.5rem">{{event.goodsPrice}}</span>
            </div>
            <button class="applyEvent" type="">我要报名</button>
        </div>
        <div class="eventInfo">
            <div class="publisher">
                <img :src="publisher.thumb" alt="">
                <span>{{publisher.businessName}}</span>
                <button type="">+    关注</button>
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
                 <span class="eventFans">  <img src="./学院粉丝图标.png" alt=""> {{publisher.fans}}粉丝</span>
                 <span class="eventLikers" > <img src="./like_icon.png" alt="">  {{event.zan}}喜欢</span>
                 <span class="eventShare">  <img src="./学院分享图标.png" alt=""> {{event.share}}分享</span>
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
                         <img src="./学院赞图标.png" alt="">
                        <span style="font-size: 0.3rem;position: relative;top: -0rem;left: 0rem">{{comment.zan}}</span>
                      </span>
                   <img  style="width: 0.3rem;height: 0.3rem;" src="./学院评论图标.png" alt="">
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
 import Spinner  from '../../components/spinner.vue'
 import eventInfo from '../../model/eventInfo'
 import openApp from '../../components/openApp.vue'
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
                eventInfo.getEvent(id,pageIndex).then(function(data){
                that.event = data.data
                that.loading = false
                that.publisher = that.event.goodsService
                },function(error){
                    console.log(data.msg)
                })
            }
            else{
                
            }
           
        }
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
    font-size: 0.5rem;
}
div.eventHead{
    background: white;
}   
div.eventHead img{
    width: 100%;
    height: 6.3rem;
}
div.eventTime{
    position: absolute;
    top: 5.4rem;
    padding-left: 0.5rem;
    background: #444;
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    color: white; 
    font-size: 0.35rem;
    opacity: 0.8;
} 
div.eventTitle{
    padding:0.1rem 0.3rem;
    font-size: 0.35rem;
    font-weight: bold;
}
div.eventPrice{
    color: #c40000;
    padding-left: 0.3rem;
    padding-bottom: 0.2rem;
}

button.applyEvent{
    position: absolute;
    right: 0.3rem;
    top: 6.8rem;
    width: 1.6rem;
    font-size: 0.25rem;
    border: 0px;
    border-radius: 0.1rem;
    color: white;
    padding: 0.15rem 0.02rem;
    background: #14CC81;
}
div.eventInfo{
    margin-top: 0.3rem;
    background: white;
}
div.publisher{
    border-bottom: 1px solid #ddd;
    padding: 0.3rem 0.3rem;
    padding-bottom: 0.1rem;
}
div.publisher img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 1.2rem;
    margin-right: 0.1rem;
}   
div.publisher span{
    position: relative;
    top: -0.5rem;
    font-size: 0.38rem;
}
div.publisher button{
    border: 1px solid #14CC81;
    border-radius: 0.1rem;
    float: right;
    height: 0.5rem;
    font-size: 0.24rem;
    margin-top: 0.3rem;
    background: white;
    color: green;
    width: 1.6rem;
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
    font-size: 0.4rem;
    margin-top: 0.2rem;
    padding: 0rem 0.1rem;
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
    margin-top: 0.2rem;
}
div.eventImages img{
    width: 100%;
    height: 6rem;
    margin-bottom: 0.2rem;
}
div.eventStatus{
    padding: 0.6rem 1.5rem 0.4rem 1.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.33rem;
}
div.eventStatus span{
    width: 1.2rem;
    text-align: center;
}
div.eventStatus span img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 1.2rem;
}
div.comment{
    margin-top: 0.3rem;
    background: white;
    margin-bottom: 2rem;
}
div.commentCell{
    padding: 0.3rem 0.3rem 0.05rem 0.3rem;
}
commenterHead{
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    margin-right: 0.1rem;
}
span.commenter{
    position: relative;
    top: -0.35rem;
    font-size: 0.4rem;
}
div.commentContent{
    margin-left: 1.3rem;
    font-size: 0.4rem;
}
div.commentTime{
    margin-left: 1.3rem;
    margin-top: 0.1rem;
    font-size: 0.37rem;
}
div.commentIcon{
    text-align: right;
    position: relative;
    top: -0.3rem;
}

span.commentZan img{
     width: 0.3rem;
    height: 0.3rem;
   
}
div.subComment{
    background: #ddd;
    font-size: 0.4rem;
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
/*img{
    position: relative
}
img:after { 
  content: url('../../static/img/placeholder.png');
  display: block;
  position: absolute;
  
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}*/
</style>