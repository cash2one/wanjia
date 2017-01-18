
import index from './views/index.vue'
import product from './views/product/product.vue'
import collegeEvent from './views/event/collegeEvent.vue'
import applyVip from './views/vip/applyVip.vue'
import applySuccess from './views/vip/applySuccess.vue'
import firmVipAuth from './views/vip/firmVipAuth.vue'
import firmApplied from './views/vip/firmApplied.vue'
import mainPage from './views/main/main.vue'
export default[{
   path:'/',
   component:index,
   name:'index'
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
]
