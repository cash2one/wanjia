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