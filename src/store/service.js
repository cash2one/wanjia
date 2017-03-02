import axios from 'axios'
import {getUrl} from  '../tool/urlTool'
export const getUidFromWebchat = ()=>{
    return new Promise((resolve, reject) => {
        let url = getUrl('uid','')
        axios.get(url).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
	})
}

export const  getProducts = function(id) { 
    const url = "https://app.playnet.cc/index/goods/detail/id/" + id
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

    })
}

export const getProductList = function(id){
      const url = 'https://app.playnet.cc/index/goods/category/id/' + id
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
    })
}



export const getOrderList = function(){
    const url = 'https://app.playnet.cc/index/order/index/wjkey/' + localStorage.key
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
    })
}
