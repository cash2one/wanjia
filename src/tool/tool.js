const realNameRegex = /\S+/
const phoneRegex = /(13|14|15|17|18)\d{9}$/
export function validate(type,value){
    switch (type) {
        case 'realName':
           if(!realNameRegex.test(value)){
               return "姓名不能为空或者空白"
           }
           else{
               return null;
           }
            break;
       case 'phone':
           if(!phoneRegex.test(value)){
               return "手机号为空或者格式错误"
           }
           else{
               return null;
           }
            break;
        default:
        return null;
            break;
    }
}

