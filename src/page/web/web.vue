<template>
  <div>
        
     <iframe style="height: 100vh;width: 100%;border: 0px;" :src="src"></iframe>
        
    </div>
</template>
<script>
 export default{
    data() {
      return {
       src:''
      }
    },
   mounted(){
        this.src = this.$store.state.webViewUrl
        console.log(this.src)
    },
    
 }
</script>
