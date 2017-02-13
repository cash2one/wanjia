<template>
    <div class="photoBorswerMainDiv">
        <div class="photoBorswerHeader">
            
        </div>
        <div class="photoBorswerImgs">
            <img v-for="i in imgs" class="photoBorswerImg" :src="i" alt="">
        </div>
    </div>
</template>
<script>
     export default {
        data(){
            return{}
        },
        props: ['imgs'],
        methods:{
           
        }
    }
</script>
<style>
.photoBorswerImg{
    width: 100%;
}
.photoBorswerImgs{
    overflow: scroll
}
</style>