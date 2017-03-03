import axios from 'axios'
import {getUrl} from  '../tool/urlTool'

const setpromise = (url,para) => {
    console.log(url)
	return new Promise((resolve, reject) => {
            axios.get(url).then(response=>{
            var res = response.data;
            if(res.ret_code == 0) {
                resolve(res)
            }
            else{
                reject(res)
            }
        }).catch(function(err){
            reject(err)
        })
	})
}

export const getUidFromWebchat = ()=>{
    let url = getUrl('uid','')
    setpromise(url)
}

export const  getProductInfo = function(id) { 
    const url = "https://app.playnet.cc/index/goods/detail/id/" + id
    return setpromise(url)
}

export const getProductList = function(id){
      const url = 'https://app.playnet.cc/index/goods/category/id/' + id
     return setpromise(url)
}



export const getOrderList = function(){
    const url = 'https://app.playnet.cc/index/order/index/wjkey/' + localStorage.key
    return setpromise(url)
}

export const getOrderInfo = function(id){
    const url = 'https://app.playnet.cc/index/order/detail/wjkey/' + localStorage.key +"/id/"  + id
    return setpromise(url)
}

export const getCollegeEventInfo = function(id,pageIndex){
    const url = "https://app.playnet.cc/index/xueyuan/detail/id/" + id
    return setpromise(url)
}

export const getProductDateCat = function(date,id){
    let url = 'https://app.playnet.cc/index/goods/get_price/dates/'+date+'/goodsid/' + id
    if(localStorage.key && typeof(localStorage.key) == 'string'){
        url = url + '/wjkey/' + localStorage.key
    }
    else{
        return
    }
    return setpromise(url)
}