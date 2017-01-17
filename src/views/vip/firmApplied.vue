<template>
    <div class="applyVipSuccessMainDiv">
        <div id="divApplySuccessMain">
            <div class="applySuccess">
              <img src="./OK_orange.png" alt=""> <span> 提交成功</span>
            </div>
            <div class="applyContact">
                VIP会员经理会在24小时内与你联系
            </div>
        </div>
        
        <div class="applyProcess">
            认证流程
            <div> 
                <span style="padding-left: 0.3rem"> ·  提交资料</span> 
               <span> · 24小时审核资料</span> 
               <span style="padding-right: 0.3rem"> · 40小时通过</span> 
            </div>
            
            
   
        </div>
    </div>
</template>
<script>
    export default {
    data() {
      return {
         
      }
    },
    mounted(){
        console.log(screen.height)
        document.title = "认证企业主，申请白金VIP"
        let applyBgDiv = document.getElementById('divApplySuccessMain')
        console.log(applyBgDiv)
        applyBgDiv.style.height = (screen.height - 80) + 'px'
    }
   }
</script>
<style>
div.applyVipSuccessMainDiv{
    text-align: center;
    font-size: 0.5rem;
    background: white;
}
div.applySuccess{
    color: orangered;
    padding-top: 5rem;
}
div.applySuccess img{
    width: 0.6rem;
    height: 0.6rem;
    vertical-align: middle;
}
div.applySuccess span{
   vertical-align: middle;
}
div.applyContact{
    padding-top: 0.4rem;
    font-size: 0.4rem;
    color: #666;
}
div.applyProcess{
    background: #ddd;
    padding-top: 0.4rem;
}
div.applyProcess {

}
div.applyProcess div{
    margin-top: 0.4rem;
    font-size: 0.4rem;
    padding-bottom: 0.4rem;
    display: flex;
    justify-content: space-around;
    color: #666;
}

</style>