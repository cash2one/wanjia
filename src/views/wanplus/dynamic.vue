<template>
    <div style="font-size: 0.5rem;margin-bottom: 1rem;">
        <div style="background: white;margin-top: 0.3rem" v-for="item in dynamics" @click="dynamicInfo(item)" >
            <div class="dynamicHead">
                <img :src="item.avatar" alt="">
                <span class="postName">{{item.userName}}</span>
                <span class="postTime">{{item.create_time}} 来自"{{item.boardName}}"</span>
                <button class="btnConcern" @click="toast('请打开APP')" >+ 关注</button>
            </div>
            <div class="dynamicContent">
                {{item.content}}
            </div>
            <div class="dynamicImages">
                <img :src="img" v-for="(img,index) in item.imgList.split(',')" 
                @click="listImage(item.imgList.split(','),index)" alt="">
            </div>
            <div class="zan">
                <span > <img class="imgAddress" src="./address.png" alt=""> <span> {{item.position}} </span></span>
                <span class="zanBorder zanCommentImg" > <img  src="../event/学院评论图标.png" alt=""> </span>
                <span class="zanCount zanBorder"> <img class="zanCountImg" src="../event/学院赞图标.png" alt=""> <span>  {{item.zan}} </span></span>
            </div>
            <template v-if="item.zanlist.length>0">
                <div class="commenters" >
                    <img class="commentImg" src="../event/学院赞图标.png" alt="">
                    <img class="commenterImg" :src="img.avatar" v-for="img in item.zanlist" alt="">
                    <img class="commenterMore" src="./more.png" alt="">
                </div>
            </template>
            <div class="comments">
                <div v-for="com in item.pinglun">
                    <span style="color: limegreen">{{com.userName}}: </span>
                    <span>{{com.content}}</span>
                </div>
            </div>
        </div>
        <openApp></openApp>
        <imgBoswer v-show='showImgs'></imgBoswer>
    </div>
</template>
<script>
import axios from 'axios'
 import openApp from '../../components/openApp.vue'
 import { Toast } from 'mint-ui';
 import 'mint-ui/lib/toast/style.css'
 import imgBoswer from '../../components/photoBowser.vue'
    // https://app.playnet.cc/index/discovery/index/page/0/wjkey/wj_587de84111e5c6.15126938
    export default{

        data(){
            return{
                dynamics:{},
                pageIndex:0,
                showImgs:false,
            }
        },
        mounted(){
             let url = "https://app.playnet.cc/index/discovery/index/page/" + this.pageIndex
            //let url = "http://localhost:8880/index/discovery/index/page/" + this.pageIndex
            axios.get(url).then(response=>{
            var res = response.data;
                if(res.ret_code == 0) {
                    this.pageIndex ++ 
                    this.dynamics = res.data.list
                }
                else{
                    
                }
          })
      },
      methods:{
           toast(msg){
            Toast({
            message: msg,
            position: 'bottom',
            duration: 2000
            })
          },
          dynamicInfo(item){
              console.log(item)
              this.$router.push({ name: 'dynamicInfo', params: { id:item.id }})
          },
          listImage(imgs,index){
              console.log(index)
          }
      },
      components:{
          openApp,
          imgBoswer
      }
    }
</script>
<style>
div.dynamicHead{
    height: 1.4rem;
    position: relative;
    padding:0.3rem 0.3rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.2rem;
    padding-bottom: 0rem;
}
div.dynamicHead img{
    width: 1.2rem;
    border-radius: 1.2rem;

}
span.postName{
    font-size: 0.37rem;
    position: absolute;
    left: 1.7rem;
}
span.postTime{
    font-size: 0.31rem;
    position: absolute;
    top: 1rem;
    left: 1.7rem;
    color: #999;
}
button.btnConcern{
    position: absolute;
    right: 0.3rem;
    color: limegreen;
    border: 1px solid limegreen;
    border-radius: 0.1rem;
    background: white;
    padding: 0.1rem 0.2rem;
    top: 0.5rem;
    width: 1.3rem;
    height: 0.6rem;
    font-size: 0.24rem;
}
div.dynamicContent{
    font-size: 0.35rem;
    margin: 0rem 0.3rem;
}
div.dynamicImages{
    margin: 0.3rem 0.3rem;
    margin-right: 0rem;
}
div.dynamicImages img{
    width: 3rem;
    height: 3rem;
    margin-left: 0.03rem;
    margin-right: 0.15rem;
}
div.zan{
    margin: 0rem 0.3rem;
    font-size: 0.31rem;
    color: #999;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.3rem;
}
div.zan span{
    vertical-align: middle;
}
img.imgAddress{
    width: 0.25rem;
    height: 0.4rem;
    vertical-align: middle;
}
img.zanCountImg{
    width: 0.3rem;
    height: 0.3rem;
    vertical-align: middle;
    margin-right: 0.1rem;
}

.zanCommentImg{
    float: right;
    margin-left: 0.25rem;
}
.zanCommentImg img{
     width: 0.3rem;
    height: 0.25rem;
    vertical-align: middle;
}
span.zanCount{
    float: right;
}
span.zanBorder{
    border:1px solid #eee;
    width: 1.2rem;
    text-align: center;
    height: 0.45rem;
    border-radius: 0.1rem;
    padding-top: 0.05rem;
}
div.commenters{
    margin: 0.2rem 0.3rem;
}
img.commentImg{
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.2rem;
    vertical-align: middle;
}
img.commenterMore{
    width: 0.5rem;
    height: 0.1rem;
    vertical-align: middle;
    margin-left: 0.1rem;
}
img.commenterImg{
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 0.6rem;
    vertical-align: middle;
}
div.comments{
    margin: 0rem 0.2rem;
    font-size: 0.35rem;
    padding-bottom: 0.3rem;
}
</style>