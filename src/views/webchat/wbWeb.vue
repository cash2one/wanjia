<template>
  <div>
        
             <iframe class="productFrame" :src="src"></iframe>
        
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
        let applyBgDiv = document.getElementsByClassName('productFrame')[0]
        console.log(applyBgDiv)
        applyBgDiv.style.height = (screen.height) + 'px'
    },
    components: {
      
        
    },
    methods:{
      back(){
        this.$router.back()
      }
    }
 }
</script>
