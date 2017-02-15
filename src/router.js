
import index from './views/index.vue'
import product from './views/product/product.vue'
import collegeEvent from './views/event/collegeEvent.vue'
import applyVip from './views/vip/applyVip.vue'
import applySuccess from './views/vip/applySuccess.vue'
import firmVipAuth from './views/vip/firmVipAuth.vue'
import firmApplied from './views/vip/firmApplied.vue'
import mainPage from './views/main/main.vue'
import dynamic from './views/wanplus/dynamic.vue'
import dynamicInfo from './views/wanplus/dynamicInfo.vue'
import productList from './views/product/productList.vue'
import webView from './views/web/webView.vue'
import webchatMain from './views/webchat/wbmain.vue'
import webProductList from './views/webchat/wbProductList.vue'
import webProduct from './views/webchat/wbProduct.vue'
import demo from './views/demo.vue'
export default[{
   path:'/',
   component:index,
   name:'index'
},
{
   path:'/demo',
   component:demo,
   name:'demo'
},
{
   path:'/product/:id',
   component:product,
   name:'product'
},
{
   path:'/event/:id',
   component:collegeEvent,
   name:'event'
},
{
   path:'/vip/apply',
   component:applyVip,
   name:'applyVip'
},
{
   path:'/vip/applySuccess',
   component:applySuccess,
   name:'applySuccess'
},
{
   path:'/vip/firmvipauth',
   component:firmVipAuth,
   name:'firmVipAuth'
},
{
   path:'/vip/firmapplied',
   component:firmApplied,
   name:'firmApplied'
},
{
   path:'/main',
   component:mainPage,
   name:'mainPage'
},
{
   path:'/dynamic',
   component:dynamic,
   name:'dynamic'
},
{
   path:'/dynamic/:id',
   component:dynamicInfo,
   name:'dynamicInfo'
},
{
   path:'/productList/:type',
   component:productList,
   name:'productList'
},
{
   path:'/webview',
   component:webView,
   name:'webView'
},
{
   path:'/wb',
   component:webchatMain,
   name:'wbmain'
},
{
   path:'/wb/productList/:type',
   component:webProductList,
   name:'webproductList'
},
{
   path:'/wb/product/:id',
   component:webProduct,
   name:'webProduct'
},
]
