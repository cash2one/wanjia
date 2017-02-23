
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
import webchatProductList from './views/webchat/main/wbProductList.vue'
import webchatProduct from './views/webchat/main/wbProduct.vue'
import webchatOrder from './views/webchat/order/wbOrder.vue'
import wbChooseTraveler from './views/webchat/order/wbChooseTraveler.vue'
import wbAddTraveler from './views/webchat/order/wbAddTraveler.vue'
import wbOrderInfo from './views/webchat/order/wbOrderInfo.vue'
import wbPayOrder from './views/webchat/order/wbPayOrder.vue'

import webchatWeb from './views/webchat/wbWeb.vue'

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
   path:'/webview',
   component:webView,
   name:'webView'
},
{
   path:'/main',
   component:mainPage,
   name:'mainPage'
},
{
   path:'/product/:id',
   component:product,
   name:'product'
},
{
   path:'/productList/:type',
   component:productList,
   name:'productList'
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
   path:'/wb',
   component:webchatMain,
   name:'wbmain'
},
{
   path:'/wbproductList/:type',
   component:webchatProductList,
   name:'webchatProductList'
},
{
   path:'/wbproduct/:id',
   component:webchatProduct,
   name:'webchatProduct'
},
{
   path:'/wborder/:id',
   component:webchatOrder,
   name:'webchatOrder'
},

{
   path:'/wbChooseTraveler',
   component:wbChooseTraveler,
   name:'wbChooseTraveler'
},

{
   path:'/wbAddTraveler',
   component:wbAddTraveler,
   name:'wbAddTraveler'
},

{
   path:'/wbOrderInfo/:id',
   component:wbOrderInfo,
   name:'wbOrderInfo'
},
{
   path:'/wbPayOrder/:id',
   component:wbPayOrder,
   name:'wbPayOrder'
},


{
   path:'/wb/web',
   component:webchatWeb,
   name:'webchatWeb'
},
]
