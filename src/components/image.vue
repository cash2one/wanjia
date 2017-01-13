<template>
    <img :src="s" alt="" @onload="loading" @onerror="showError">
</template>
<script>
    export default {
        props: {
            imgSrc: {
                type: String
            }
        },
        data(){
            return{
                s:''
            }
        },
        mounted(){
            this.s = this.imgSrc
        },
        methods:{
            loading(){
                this.s = '../static/img/placeholder.png'
            },
            showError(){
                console.log('image fail')
                this.s = '../static/img/placeholder.png'
            },
        }
    }
</script>