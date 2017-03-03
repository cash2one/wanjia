<template>
    <div style="font-size: 0.6rem;margin-bottom: 1rem;">
        <div style="background: white;margin-top: 0.4rem" v-for="item in dynamics" @click="dynamicInfo(item)" >
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
                <span > <img class="imgAddress" src="static/img/product/btn_address.png" alt=""> <span> {{item.position}} </span></span>
                <span class="zanBorder zanCommentImg" > <img  src="static/img/college/comment.png" alt=""> </span>
                <span class="zanCount zanBorder"> <img class="zanCountImg" src="static/img/college/praise.png" alt=""> 
                <span>  {{item.zan}} </span></span>
            </div>
            <template v-if="item.zanlist.length>0">
                <div class="commenters" >
                    <img class="commentImg" src="static/img/college/praise.png" alt="">
                    <img class="commenterImg" :src="img.avatar" v-for="img in item.zanlist" alt="">
                    <img class="commenterMore" src="static/img/main/more.png" alt="">
                </div>
            </template>
            <div class="comments">
                <div v-for="com in item.pinglun">
                    <span style="color: limegreen">{{com.userName}}: </span>
                    <span>{{com.content}}</span>
                </div>
            </div>
        </div>
        <div style="height: 1rem">
            
        </div>
        <openApp></openApp>
        <imgBoswer v-show='showImgs'  ></imgBoswer>
    </div>
</template>
<script>
import axios from 'axios'
 import openApp from '../../components/openApp.vue'
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
          dynamicInfo(item){
              console.log(item)
              this.$router.push({ name: 'dynamicInfo', params: { id:item.id }})
          },
          listImage(imgs,index){
              console.log(index)
          },
          back(){
              console.log('back')
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
    height: 2.3rem;
    position: relative;
    padding:0.4rem 0.4rem;
    border-bottom: 1px solid #eee;
    margin-bottom: 0.4rem;
    padding-bottom: 0rem;
}
div.dynamicHead img{
    width: 1.5rem;
    border-radius: 1.5rem;

}
span.postName{
    font-size: 0.5rem;
    position: absolute;
    left: 2.3rem;
    top: 0.5rem;
}
span.postTime{
    font-size: 0.45rem;
    position: absolute;
    top: 1rem;
    left: 2.3rem;
    color: #999;
    top: 1.2rem;
}
button.btnConcern{
    position: absolute;
    right: 0.5rem;
    color: limegreen;
    border: 1px solid limegreen;
    border-radius: 0.1rem;
    background: white;
    padding: 0.1rem 0.2rem;
    top: 0.8rem;
    width: 2rem;
    height: 0.8rem;
    font-size: 0.42rem;
}
div.dynamicContent{
    font-size: 0.5rem;
    margin: 0rem 0.3rem;
}
div.dynamicImages{
    margin: 0.3rem 0.3rem;
    margin-right: 0rem;
}
div.dynamicImages img{
    width: 5rem;
    height: 5rem;
    margin-left: 0.03rem;
    margin-right: 0.15rem;
}
div.zan{
    margin: 0rem 0.3rem;
    font-size: 0.5rem;
    color: #999;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.3rem;
}
div.zan span{
    vertical-align: middle;
}
img.imgAddress{
    width: 0.3rem;
    height: 0.5rem;
    vertical-align: middle;
}
img.zanCountImg{
    width: 0.5rem;
    height: 0.5rem;
    vertical-align: middle;
    margin-right: 0.1rem;
}

.zanCommentImg{
    float: right;
    margin-left: 0.25rem;
}
.zanCommentImg img{
     width: 0.5rem;
    height: 0.45rem;
    vertical-align: middle;
}
span.zanCount{
    float: right;
}
span.zanBorder{
    border:1px solid #eee;
    width: 1.8rem;
    text-align: center;
    height: 0.8rem;
    border-radius: 0.1rem;
    padding-top: 0.05rem;
}

div.commenters{
    margin: 0.3rem 0.4rem;
}
img.commentImg{
    width: 0.5rem;
    height: 0.5rem;
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
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 0.8rem;
    vertical-align: middle;
    margin-right: 0.2rem;
}   
div.comments{
    margin: 0.1rem 0.4rem;
    font-size: 0.5rem;
    padding-bottom: 0.5rem;
}
div.comments div{
    margin-top: 0.1rem;
}
</style>