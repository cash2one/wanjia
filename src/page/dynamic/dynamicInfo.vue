<template>
    <div>
         <div style="background: white;margin-top: 0.3rem">
            <div class="dynamicHead">
                <img :src="dynamic.avatar" alt="">
                <span class="postName">{{dynamic.userName}}</span>
                <span class="postTime">{{dynamic.create_time}} 来自"{{dynamic.boardName}}"</span>
                <button class="btnConcern" @click="toast('请打开APP')" >+ 关注</button>
            </div>
            <div class="dynamicContent">
                {{dynamic.content}}
            </div>
            <div class="dynamicImages">
              <img :src="img" v-for="img in imgList" alt="">
            </div>
            <div class="zan">
                <span > <img class="imgAddress" src="static/img/product/btn_address.png" alt=""> <span> {{dynamic.position}} </span></span>
                <span class="zanBorder zanCommentImg" > <img  src="static/img/college/comment.png" alt=""> </span>
                <span class="zanCount zanBorder"> <img class="zanCountImg" src="static/img/college/praise.png" alt=""> <span>  {{dynamic.zan}} </span></span>
            </div>
            <template v-if="zanList.length>0">
                <div class="commenters" >
                    <img class="commentImg" src="static/img/college/praise.png" alt="">
                    <img class="commenterImg" :src="img.avatar" v-for="img in dynamic.zanlist" alt="">
                    <img class="commenterMore" src="static/img/main/more.png" alt="">
                </div>
            </template>
            <div class="comments">
                <div v-for="com in comments">
                    <img class="commentHeadImg" :src="com.avatar" alt="">
                    <span  style="display: inline-flex;flex-direction: column;vertical-align: top;margin-left: 0.1rem">
                        <span class="commentUsername" >{{com.userName}} </span>
                        <span class="commentContent">{{com.content}}</span>
                        <span class="commentTime">{{com.create_time}}</span>
                    </span>
                </div>
            </div>
        </div>
         <div style="height: 1.5rem">
            
        </div>
          <openApp></openApp>
    </div>
</template>
<script>
import axios from 'axios'
 import openApp from '../../components/openApp.vue'
import {getDynamicInfo} from '../../store/service'
 export default{

        data(){
            return{
                dynamic:{},
                imgList:[],
                zanList:[],
                comments:[],
            }
        },
        mounted(){
            document.title = "玩+"
             let id = this.$route.params.id
             var that = this
           getDynamicInfo(id).then(function(data){
                that.dynamic = data.data.detail
                that.imgList = that.dynamic.imgList.split(',')
                that.zanList = that.dynamic.zanlist
                that.comments = res.data.comment
            },function(error){
                console.log(data.msg)
                 this.$vux.toast.show({
                   text: '网络错误，请重新再试',
                   position:"bottom",
                   type:'text'
                })
            })
      },
      components:{
          openApp
      }
    }
</script>
<style>


div.comments div{
     padding-bottom: 0.4rem;
     border-bottom: 1px solid #ddd;
     padding-top: 0.3rem;
     position: relative;
     vertical-align: top;
}
.commentHeadImg{
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 0.6rem;
}
.commentUsername{
    color: #aaa;
    font-size: 0.5rem;
}
.commentContent{
    margin-top: 0.5rem;
    font-size: 0.45rem;
}
.commentTime{
  font-size: 0.45rem;
  margin-top: 0.1rem;
}div.comments div:last-child{
    border-bottom: 0px;
}
</style>