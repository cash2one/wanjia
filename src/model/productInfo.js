import axios from 'axios'
import vueResource from "vue-resource"
import resultInfo from './resultInfo'
const productInfo = {
    title:'我很好',
    img:'http://d.5857.com/xg_161228/001.jpg',
};

function getProducts(id) { 
    //const url = "http://45.32.23.77:8880/index/goods/detail/id/" + id
    const url = "http://localhost:8880/index/goods/detail/id/" + id
    console.log(url)
    return new Promise(function(resolve,reject){
        axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
                resolve(res)
            }
            else{
                reject(res)
            }
        })
        // vueResource.$http.jsonp(url).then(response=>{
        //     var res = response.data;
        //     if(res.ret_code == 0) {
        //         resolve(res)
        //     }
        //     else{
        //         reject(res)
        //     }
        // })

    })
}

export default {
     productInfo,
     getProducts,
}