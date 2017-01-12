
import index from './views/index.vue'
import product from './views/product/product.vue'
import collegeEvent from './views/event/collegeEvent.vue'
import applyVip from './views/vip/applyVip.vue'
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
]
