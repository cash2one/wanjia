import axios from 'axios'
import vueResource from "vue-resource"
import resultInfo from './resultInfo'
const eventInfo = {
    title:'我很好',
    img:'http://d.5857.com/xg_161228/001.jpg',
};

function getEvent(eventId,pageIndex) { 
    //const url = "http://45.32.23.77:8880/index/xueyuan/detail/id/" + eventId
    const url = "http://localhost:3000/index/xueyuan/detail/id/" + eventId + "/page/"+pageIndex
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

export default {
     eventInfo,
     getEvent,
}